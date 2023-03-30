'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">atlas-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AnalyticsModule.html" data-type="entity-link" >AnalyticsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' : 'data-target="#xs-controllers-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' :
                                            'id="xs-controllers-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' }>
                                            <li class="link">
                                                <a href="controllers/AnalyticsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalyticsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' : 'data-target="#xs-injectables-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' :
                                        'id="xs-injectables-links-module-AnalyticsModule-606ff08d44013222f531aeaba6df401ea4fadb00b803a3872b1bfea1e38e235805dfbddf186d3fc01a1c2da1ccce115bc4e084dfcccfaf9df709dc72e0d292c1"' }>
                                        <li class="link">
                                            <a href="injectables/AnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalyticsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppealsModule.html" data-type="entity-link" >AppealsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' : 'data-target="#xs-controllers-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' :
                                            'id="xs-controllers-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' }>
                                            <li class="link">
                                                <a href="controllers/AppealsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppealsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' : 'data-target="#xs-injectables-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' :
                                        'id="xs-injectables-links-module-AppealsModule-edf58802c65b5739157858574736e851e662fb51a90e0e959eeef8ec4a4dfaafe08b62d5bba8304919e403ef804cc512f9b122914a176fa4b14972064462be52"' }>
                                        <li class="link">
                                            <a href="injectables/AppealsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppealsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-1ba8102e229582325ceb5d8cb382af85294bfcc67792b2642f14f126527e82962b7735276ece2405741eb09f3bea5b7510a468a7e76223d733715aefe681b02a"' : 'data-target="#xs-injectables-links-module-AppModule-1ba8102e229582325ceb5d8cb382af85294bfcc67792b2642f14f126527e82962b7735276ece2405741eb09f3bea5b7510a468a7e76223d733715aefe681b02a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1ba8102e229582325ceb5d8cb382af85294bfcc67792b2642f14f126527e82962b7735276ece2405741eb09f3bea5b7510a468a7e76223d733715aefe681b02a"' :
                                        'id="xs-injectables-links-module-AppModule-1ba8102e229582325ceb5d8cb382af85294bfcc67792b2642f14f126527e82962b7735276ece2405741eb09f3bea5b7510a468a7e76223d733715aefe681b02a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' : 'data-target="#xs-controllers-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' :
                                            'id="xs-controllers-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' : 'data-target="#xs-injectables-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' :
                                        'id="xs-injectables-links-module-AuthModule-30ee4eae969e0809599ad2ed9db0d5c999633661653015e20410707c3dce7e8ce75804a1d44ef71845fa3016ceca28a7fe9a8b603c2853b3221d4f13d4e5932f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlockModule.html" data-type="entity-link" >BlockModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' : 'data-target="#xs-controllers-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' :
                                            'id="xs-controllers-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' }>
                                            <li class="link">
                                                <a href="controllers/BlockController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlockController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' : 'data-target="#xs-injectables-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' :
                                        'id="xs-injectables-links-module-BlockModule-c257eccc199b70d179c76a01efa82379af2635b4895f9a86136395488763c4b090d3bc1c481dca6ee86a4c577d1d63a7555916cfd4058fe5c71c4439601cdded"' }>
                                        <li class="link">
                                            <a href="injectables/BlockService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlockService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventModule.html" data-type="entity-link" >EventModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' : 'data-target="#xs-controllers-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' :
                                            'id="xs-controllers-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' }>
                                            <li class="link">
                                                <a href="controllers/EventController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' : 'data-target="#xs-injectables-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' :
                                        'id="xs-injectables-links-module-EventModule-9e6a5bb2ddaf398d6a9ba416d79c4e078fdaebe47dd47951a7600adb567513d55f1a56f91750ab55c5bbef3dc32febe2cb7f08f9a74f845ad974ac243e36253e"' }>
                                        <li class="link">
                                            <a href="injectables/EventService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeedModule.html" data-type="entity-link" >FeedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' : 'data-target="#xs-controllers-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' :
                                            'id="xs-controllers-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' }>
                                            <li class="link">
                                                <a href="controllers/FeedController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' : 'data-target="#xs-injectables-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' :
                                        'id="xs-injectables-links-module-FeedModule-d0fba6a059d4034ff6e2ed816742873a75de75ad746dfb70b9d581301f15eac73297ee226b53e8c3d9ae5c821dd6376ce269a9bba1c143951de4eaf30f807fa7"' }>
                                        <li class="link">
                                            <a href="injectables/FeedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FollowModule.html" data-type="entity-link" >FollowModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' : 'data-target="#xs-controllers-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' :
                                            'id="xs-controllers-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' }>
                                            <li class="link">
                                                <a href="controllers/FollowController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FollowController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' : 'data-target="#xs-injectables-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' :
                                        'id="xs-injectables-links-module-FollowModule-84f83820a1302711487af0cc5736ccb76703ff54a3176a09645676e61d2e378844e4c0a08e91b2e3ad79cbcaecc2d54ad44488c4a822d2b546edbde33c6c11e0"' }>
                                        <li class="link">
                                            <a href="injectables/FollowService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FollowService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MemoryModule.html" data-type="entity-link" >MemoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' : 'data-target="#xs-controllers-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' :
                                            'id="xs-controllers-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' }>
                                            <li class="link">
                                                <a href="controllers/MemoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' : 'data-target="#xs-injectables-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' :
                                        'id="xs-injectables-links-module-MemoryModule-24e5e80ce6d4defbba1942f83519f06ceb9799b4c7503c6d374d183cd8f396a51a086f46178adb2b34cca6ae15dbf0b16159d516b753c6d47c6566c385d2fe3b"' }>
                                        <li class="link">
                                            <a href="injectables/MemoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationModule.html" data-type="entity-link" >NotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' : 'data-target="#xs-controllers-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' :
                                            'id="xs-controllers-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' }>
                                            <li class="link">
                                                <a href="controllers/NotificationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' : 'data-target="#xs-injectables-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' :
                                        'id="xs-injectables-links-module-NotificationModule-3c61554732fd7b71779849ff7108bbb8c879c1359babbbb79e7bdfd44778d17e02ba2c6d0b3b7226f03f2799e023a6b8c22bd5a35e0ae9148f2dde45f011df76"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' : 'data-target="#xs-controllers-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' :
                                            'id="xs-controllers-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' : 'data-target="#xs-injectables-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' :
                                        'id="xs-injectables-links-module-PaymentModule-7644834beba0e189ea03f4f8511df5e67c3c34f269dc4881c44cde8a34e63dc7d373bd85d516ed1d827354fc8da1cba2c0d040d82468d6de083b3f42d14c73ba"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' : 'data-target="#xs-controllers-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' :
                                            'id="xs-controllers-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' : 'data-target="#xs-injectables-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' :
                                        'id="xs-injectables-links-module-PostModule-fe60ea8d40427d4be2981afb649c83c8971571d801007b4823593e6991b9328842134ebc55c42d745aca692a033c91ccf9c06c3c391c444db7f92c6c0845fcf5"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportModule.html" data-type="entity-link" >ReportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' : 'data-target="#xs-controllers-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' :
                                            'id="xs-controllers-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' }>
                                            <li class="link">
                                                <a href="controllers/ReportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' : 'data-target="#xs-injectables-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' :
                                        'id="xs-injectables-links-module-ReportModule-590c4b5b2422180ef662525347d408ce5aa720a5d4b8e9f71699407ee806189d5cd519ae772eec9a532ca245388d486dba1a23c4a0d32ad67aead066d2b6dd5f"' }>
                                        <li class="link">
                                            <a href="injectables/ReportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TasksModule-389a8b40270bfb590f29ca7426bc7e2266e9ef2d1e31061bf57312a489f829662c15a556444d90d6d2008818c6ea53f5854fede369da4f41f2967465ed353b1a"' : 'data-target="#xs-injectables-links-module-TasksModule-389a8b40270bfb590f29ca7426bc7e2266e9ef2d1e31061bf57312a489f829662c15a556444d90d6d2008818c6ea53f5854fede369da4f41f2967465ed353b1a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-389a8b40270bfb590f29ca7426bc7e2266e9ef2d1e31061bf57312a489f829662c15a556444d90d6d2008818c6ea53f5854fede369da4f41f2967465ed353b1a"' :
                                        'id="xs-injectables-links-module-TasksModule-389a8b40270bfb590f29ca7426bc7e2266e9ef2d1e31061bf57312a489f829662c15a556444d90d6d2008818c6ea53f5854fede369da4f41f2967465ed353b1a"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' : 'data-target="#xs-controllers-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' :
                                            'id="xs-controllers-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' : 'data-target="#xs-injectables-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' :
                                        'id="xs-injectables-links-module-UserModule-cbe3c5f4f6bc318a35d7477c2d2392d03ff2334fab8364f54a68dd8c4a30466c2674801a32fd126d57adfef64d8619623d44754658c23cb84e099b93807ab233"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AnalyticsController.html" data-type="entity-link" >AnalyticsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppealsController.html" data-type="entity-link" >AppealsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BlockController.html" data-type="entity-link" >BlockController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EventController.html" data-type="entity-link" >EventController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FeedController.html" data-type="entity-link" >FeedController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FollowController.html" data-type="entity-link" >FollowController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MemoryController.html" data-type="entity-link" >MemoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotificationController.html" data-type="entity-link" >NotificationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PaymentController.html" data-type="entity-link" >PaymentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostController.html" data-type="entity-link" >PostController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReportController.html" data-type="entity-link" >ReportController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Appeal.html" data-type="entity-link" >Appeal</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Block.html" data-type="entity-link" >Block</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Comment.html" data-type="entity-link" >Comment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Event.html" data-type="entity-link" >Event</a>
                                </li>
                                <li class="link">
                                    <a href="entities/EventClue.html" data-type="entity-link" >EventClue</a>
                                </li>
                                <li class="link">
                                    <a href="entities/EventGoal.html" data-type="entity-link" >EventGoal</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Follow.html" data-type="entity-link" >Follow</a>
                                </li>
                                <li class="link">
                                    <a href="entities/FollowRequest.html" data-type="entity-link" >FollowRequest</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Like.html" data-type="entity-link" >Like</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Memory.html" data-type="entity-link" >Memory</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PostReport.html" data-type="entity-link" >PostReport</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Scrapbook.html" data-type="entity-link" >Scrapbook</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserBan.html" data-type="entity-link" >UserBan</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserReport.html" data-type="entity-link" >UserReport</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/$npmConfigName1672082558971.html" data-type="entity-link" >$npmConfigName1672082558971</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672082713679.html" data-type="entity-link" >$npmConfigName1672082713679</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672133224744.html" data-type="entity-link" >$npmConfigName1672133224744</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672166137042.html" data-type="entity-link" >$npmConfigName1672166137042</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672251740346.html" data-type="entity-link" >$npmConfigName1672251740346</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672388811259.html" data-type="entity-link" >$npmConfigName1672388811259</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672399737695.html" data-type="entity-link" >$npmConfigName1672399737695</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672417201262.html" data-type="entity-link" >$npmConfigName1672417201262</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672417384470.html" data-type="entity-link" >$npmConfigName1672417384470</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672576067204.html" data-type="entity-link" >$npmConfigName1672576067204</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672585305519.html" data-type="entity-link" >$npmConfigName1672585305519</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672600378154.html" data-type="entity-link" >$npmConfigName1672600378154</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672678196724.html" data-type="entity-link" >$npmConfigName1672678196724</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672744437528.html" data-type="entity-link" >$npmConfigName1672744437528</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672760070076.html" data-type="entity-link" >$npmConfigName1672760070076</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672832148243.html" data-type="entity-link" >$npmConfigName1672832148243</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1672833410692.html" data-type="entity-link" >$npmConfigName1672833410692</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673022319464.html" data-type="entity-link" >$npmConfigName1673022319464</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673025398979.html" data-type="entity-link" >$npmConfigName1673025398979</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673027114310.html" data-type="entity-link" >$npmConfigName1673027114310</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673177373733.html" data-type="entity-link" >$npmConfigName1673177373733</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673337064308.html" data-type="entity-link" >$npmConfigName1673337064308</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673770456243.html" data-type="entity-link" >$npmConfigName1673770456243</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673847605869.html" data-type="entity-link" >$npmConfigName1673847605869</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1673974513613.html" data-type="entity-link" >$npmConfigName1673974513613</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1674121256550.html" data-type="entity-link" >$npmConfigName1674121256550</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1674198387677.html" data-type="entity-link" >$npmConfigName1674198387677</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1674453163372.html" data-type="entity-link" >$npmConfigName1674453163372</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1674486373359.html" data-type="entity-link" >$npmConfigName1674486373359</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1674487677914.html" data-type="entity-link" >$npmConfigName1674487677914</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1674493007150.html" data-type="entity-link" >$npmConfigName1674493007150</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1674544597118.html" data-type="entity-link" >$npmConfigName1674544597118</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1675177507147.html" data-type="entity-link" >$npmConfigName1675177507147</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1676616826310.html" data-type="entity-link" >$npmConfigName1676616826310</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1676624523857.html" data-type="entity-link" >$npmConfigName1676624523857</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1676644288779.html" data-type="entity-link" >$npmConfigName1676644288779</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1676990992500.html" data-type="entity-link" >$npmConfigName1676990992500</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1676993098020.html" data-type="entity-link" >$npmConfigName1676993098020</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1678774445242.html" data-type="entity-link" >$npmConfigName1678774445242</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1678779028547.html" data-type="entity-link" >$npmConfigName1678779028547</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1678779204584.html" data-type="entity-link" >$npmConfigName1678779204584</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1678780013678.html" data-type="entity-link" >$npmConfigName1678780013678</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1678780110507.html" data-type="entity-link" >$npmConfigName1678780110507</a>
                            </li>
                            <li class="link">
                                <a href="classes/$npmConfigName1678975542609.html" data-type="entity-link" >$npmConfigName1678975542609</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppealDto.html" data-type="entity-link" >AppealDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClueDto.html" data-type="entity-link" >CreateClueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEventDto.html" data-type="entity-link" >CreateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGoalDto.html" data-type="entity-link" >CreateGoalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMemoryDto.html" data-type="entity-link" >CreateMemoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateScrapBookDto.html" data-type="entity-link" >CreateScrapBookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProximityEventsDto.html" data-type="entity-link" >GetProximityEventsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProximityMemoryDto.html" data-type="entity-link" >GetProximityMemoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageDto.html" data-type="entity-link" >PageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageMetaDto.html" data-type="entity-link" >PageMetaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageOptionsDto.html" data-type="entity-link" >PageOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostAnalyticResposneDto.html" data-type="entity-link" >PostAnalyticResposneDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReCaptchaResponseDto.html" data-type="entity-link" >ReCaptchaResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportDto.html" data-type="entity-link" >ReportDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendNotificationDto.html" data-type="entity-link" >SendNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpUserDto.html" data-type="entity-link" >SignUpUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserBioDto.html" data-type="entity-link" >UpdateUserBioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDateOfBirthDto.html" data-type="entity-link" >UpdateUserDateOfBirthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserEmailDto.html" data-type="entity-link" >UpdateUserEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPasswordDto.html" data-type="entity-link" >UpdateUserPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPhoneNumberDto.html" data-type="entity-link" >UpdateUserPhoneNumberDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AnalyticsService.html" data-type="entity-link" >AnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppealsService.html" data-type="entity-link" >AppealsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BlockService.html" data-type="entity-link" >BlockService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EncryptionService.html" data-type="entity-link" >EncryptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link" >EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FeedService.html" data-type="entity-link" >FeedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseStorageService.html" data-type="entity-link" >FirebaseStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FollowService.html" data-type="entity-link" >FollowService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemoryService.html" data-type="entity-link" >MemoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link" >PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostService.html" data-type="entity-link" >PostService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link" >ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripeService.html" data-type="entity-link" >StripeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksService.html" data-type="entity-link" >TasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SubscriptionsGuard.html" data-type="entity-link" >SubscriptionsGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/PageMetaDtoParameters.html" data-type="entity-link" >PageMetaDtoParameters</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});