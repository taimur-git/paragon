<script lang="ts">

	import { AppRail, AppRailAnchor, AppRailTile, AppShell } from "@skeletonlabs/skeleton";


    import logo from '$lib/images/logo.svg';

    const urls = [
        { pageTitle: '/home', selected: true },
        { pageTitle: '/myAds', selected: false },
        { pageTitle: '/browseAds', selected: false },
        { pageTitle: '/postAd', selected: false }
    ];

    function setAllFalse():void{
        urls.forEach((url) => {
                url.selected = false;
            });
    }

    function selectPage(pageTitle: string):void {
        setAllFalse();
        switch(pageTitle){
            case '/home':
                urls[0].selected = true;
                break;
            case '/myAds':
                urls[1].selected = true;
                break;
            case '/browseAds':
                urls[2].selected = true;
                break;
            case '/postAd':
                urls[3].selected = true;
                break;
            default:
                setAllFalse();
                break;
        }
        /*
        if(pageTitle === '/home')
        {
            
            urls[0].selected = true;
            //urls[1].selected = false;
            //urls[2].selected = false;
        }
        else if(pageTitle === '/myAds')
        {
            urls[0].selected = false;
            urls[1].selected = true;
            urls[2].selected = false;
        }
        else if(pageTitle === '/browseAds')
        {
            urls[0].selected = false;
            urls[1].selected = false;
            urls[2].selected = true;
        }
        else
        {
            urls[0].selected = false;
            urls[1].selected = false;
            urls[2].selected = false;
        }
        */
    }
    
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
        
    <AppRail>
        <svelte:fragment slot="lead">
            <AppRailAnchor href="/" >
            <img src={logo} alt="logo" class="mx-auto"></AppRailAnchor>
        </svelte:fragment>
        <!-- --- -->
        
        <AppRailAnchor href="/home" title="Account" selected={urls[0].selected} on:click={()=>selectPage(urls[0].pageTitle)}>
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                
            </svelte:fragment>
            <span class="navTitle">Home</span>
        </AppRailAnchor>

        <AppRailAnchor href="/myAds" title="Account" selected={urls[1].selected} on:click={()=>selectPage(urls[1].pageTitle)}>
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM229.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7L253.2 328H162.8l-5.4 10.7c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zM208 237.7L186.8 280h42.3L208 237.7zM392 256a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm24-43.9V184c0-13.3 10.7-24 24-24s24 10.7 24 24v96 48c0 13.3-10.7 24-24 24c-6.6 0-12.6-2.7-17-7c-9.4 4.5-19.9 7-31 7c-39.8 0-72-32.2-72-72s32.2-72 72-72c8.4 0 16.5 1.4 24 4.1z"/></svg>
            </svelte:fragment>
            <span class="navTitle">My Ads</span>
        </AppRailAnchor>

        <AppRailAnchor href="/postAd" title="Account" selected={urls[3].selected} on:click={()=>selectPage(urls[3].pageTitle)}>
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Post Ad</span>
        </AppRailAnchor>

        <AppRailAnchor href="/mySchedule" title="Account" selected={urls[2].selected} on:click={()=>selectPage(urls[2].pageTitle)}>
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
            </svelte:fragment>
            <span class="navTitle">My Schedule</span>
        </AppRailAnchor>
        
        
        <!-- --- -->
        <svelte:fragment slot="trail">
            <AppRailAnchor href="/" title="Account">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 512 512" class="mx-auto"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
            </AppRailAnchor>
        </svelte:fragment>
    </AppRail>

    </svelte:fragment>
	<slot />
</AppShell>

<style>
    .navTitle{
        color: #4c0c74;
    }
</style>