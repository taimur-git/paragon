<script lang="ts">

	import { AppRail, AppRailAnchor, AppRailTile, AppShell, Modal, Toast } from "@skeletonlabs/skeleton";
    import type { PageData } from './$types';
    import logo from '$lib/images/logo.svg';

    export let data: PageData;

    // console.log(data.has_app);
    $: data.has_app = data.has_app === true ? true : false;
    const urls = [
        { pageTitle: '/home', selected: true },
        { pageTitle: '/myCourses', selected: false },
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
            case '/myCourses':
                urls[1].selected = true;
                break;
            case '/myAds':
                urls[2].selected = true;
                break;
            case '/browseAds':
                urls[3].selected = true;
                break;
            case '/postAd':
                urls[4].selected = true;
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
<Modal />
<Toast position="tr"/>
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
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                
            </svelte:fragment>
            <span class="navTitle">Home</span>
        </AppRailAnchor>

        {#if data.has_app===true}
            <AppRailAnchor href="/myCourses" title="Account" selected={urls[1].selected} on:click={()=>selectPage(urls[1].pageTitle)}>
                <svelte:fragment slot="lead">
                    <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/></svg>
                </svelte:fragment>
                <span class="navTitle">Enrolled courses</span>
            </AppRailAnchor>
        {/if}
        <AppRailAnchor href="/myAds" title="Account" selected={urls[2].selected} on:click={()=>selectPage(urls[2].pageTitle)}>
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM229.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7L253.2 328H162.8l-5.4 10.7c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zM208 237.7L186.8 280h42.3L208 237.7zM392 256a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm24-43.9V184c0-13.3 10.7-24 24-24s24 10.7 24 24v96 48c0 13.3-10.7 24-24 24c-6.6 0-12.6-2.7-17-7c-9.4 4.5-19.9 7-31 7c-39.8 0-72-32.2-72-72s32.2-72 72-72c8.4 0 16.5 1.4 24 4.1z"/></svg>
            </svelte:fragment>
            <span class="navTitle">My Ads</span>
        </AppRailAnchor>

        <AppRailAnchor href="/postAd" title="Account" selected={urls[3].selected} on:click={()=>selectPage(urls[3].pageTitle)}>
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"/></svg>
            </svelte:fragment>
            <span class="navTitle">Post Ad</span>
        </AppRailAnchor>

        <!-- <AppRailAnchor href="/mySchedule" title="Account" selected={urls[4].selected} on:click={()=>selectPage(urls[4].pageTitle)}>
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
            </svelte:fragment>
            <span class="navTitle">My Schedule</span>
        </AppRailAnchor> -->
        
        
        <!-- --- -->
        <svelte:fragment slot="trail">
            <AppRailAnchor href="/logout" title="logout">
                
                    <svg  xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" class="mx-auto"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                    
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