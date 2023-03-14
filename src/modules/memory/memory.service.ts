import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseStorageService } from 'src/common/services/firebase-storage.service';
import { DeleteResult, LessThan, MoreThan, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { GetProximityMemoryDto } from './dto/get-proximity-memory.dto';
import { CreateMemoryDto } from './dto/memory-create.dto';
import { Memory } from './entities/memory.entity';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private memoryRepository: Repository<Memory>
  ) {}

  async createMemory(user: User, memory: CreateMemoryDto, image: any): Promise<Memory> {
    const newMemory = new Memory();
    newMemory.location = memory.location;
    newMemory.latitude = memory.latitude;
    newMemory.longitude = memory.longitude;
    newMemory.location = memory.location;
    newMemory.visibility = memory.visibility;
    newMemory.user = user;

    const savedMemory = await this.memoryRepository.save(newMemory);
    const { imageId, url, expiryDate } = await new FirebaseStorageService().uploadMemoryImage(
      image.buffer,
      user.id,
      savedMemory.id
    );

    await this.memoryRepository
      .createQueryBuilder()
      .update(Memory)
      .set({
        imageId: imageId,
        imageUrl: url,
        imageExpiryDate: new Date(expiryDate)
      })
      .where('id = :id', { id: savedMemory.id })
      .execute();

    return this.memoryRepository.findOneBy({ id: savedMemory.id }).then((memory) => {
      return memory;
    });
  }

  async getProximityMemories(
    user: User,
    body: GetProximityMemoryDto,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<Memory>> {
    const [minLat, maxLat, minLon, maxLon] = this.getCoordinatesRadius(
      body.latitude,
      body.longitude
    );

    const queryResults = await this.memoryRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Memory.user', 'User')
      .where({
        longitude: MoreThan(minLon),
        latitude: MoreThan(minLat)
      })
      .andWhere({
        longitude: LessThan(maxLon),
        latitude: LessThan(maxLat)
      })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Memory.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((userMemoriesAndCount) => {
        return {
          items: userMemoriesAndCount[0],
          itemsCount: userMemoriesAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Memory[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  getCoordinatesRadius(lat: number, lon: number): [number, number, number, number] {
    const earthRadius = 6378137; // Earth's radius in meters
    const radius = 10; // 5-meter radius

    const latDiff = (radius / earthRadius) * (180 / Math.PI);
    const lonDiff = ((radius / earthRadius) * (180 / Math.PI)) / Math.cos((lat * Math.PI) / 180);

    const minLat = lat - latDiff;
    const maxLat = lat + latDiff;
    const minLon = lon - lonDiff;
    const maxLon = lon + lonDiff;

    return [minLat, maxLat, minLon, maxLon];
  }

  async getMemoryById(id: string): Promise<Memory> {
    const memory = await this.memoryRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Memory.user', 'User')
      .where('Memory.id = :id', { id: id })
      .getOne();

    if (!memory) {
      throw new HttpException('Memory not found', HttpStatus.NOT_FOUND);
    }

    if (memory.imageId) {
      if (memory.imageId && memory.imageExpiryDate < new Date(Date.now())) {
        const { url, expiryDate } = await new FirebaseStorageService().getMemoryImageSignedURL(
          memory.imageId,
          memory.user.id,
          memory.id
        );

        this.memoryRepository
          .createQueryBuilder()
          .update(Memory)
          .set({
            imageExpiryDate: new Date(expiryDate),
            imageUrl: url
          })
          .where('id = :id', { id: memory.id })
          .execute();
      }
    }

    return memory;
  }

  async deleteMemoryById(user: any, memoryId: string): Promise<DeleteResult> {
    const dbMemory = await this.getMemoryById(memoryId).then((memory) => {
      return memory;
    });

    if (!dbMemory) {
      throw new HttpException('Memory does not exist', HttpStatus.NO_CONTENT);
    }

    if (dbMemory.imageId) {
      await new FirebaseStorageService().deleteMemoryImage(dbMemory.imageId, user.id, dbMemory.id);
    }
    return await this.memoryRepository.delete({ id: memoryId });
  }

  async getUserMemories(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<Memory>> {
    const queryResults = await this.memoryRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Memory.user', 'User')
      .where('User.id = :id', { id: user.id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Memory.createdAt', 'DESC')
      .getManyAndCount()
      .then((userPostsAndCount) => {
        return {
          items: userPostsAndCount[0],
          itemsCount: userPostsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Memory[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
