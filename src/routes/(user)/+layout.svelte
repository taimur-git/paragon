<script lang="ts">

	import { AppRail, AppRailAnchor, AppRailTile, AppShell } from "@skeletonlabs/skeleton";


    import logo from '$lib/images/logo.svg';

    const urls = [
        { pageTitle: '/home', selected: true },
        { pageTitle: '/myAds', selected: false },
        { pageTitle: '/browseAds', selected: false },
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
                //window.location.href = '/myAds';
                urls[1].selected = true;
                break;
            case '/browseAds':
                urls[2].selected = true;
                //window.location.href = '/browseAds';
                break;
            default:
                //window.location.href = '/home';
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
            <img src={logo} alt="logo"></AppRailAnchor>
        </svelte:fragment>
        <!-- --- -->
        
        <AppRailAnchor href="/home" title="Account" selected={urls[0].selected} on:click={()=>selectPage(urls[0].pageTitle)}>
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Anchor</span>
        </AppRailAnchor>

        <AppRailAnchor href="/myAds" title="Account" selected={urls[1].selected} on:click={()=>selectPage(urls[1].pageTitle)}>
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Anchor</span>
        </AppRailAnchor>

        <AppRailAnchor href="/browseAds" title="Account" selected={urls[2].selected} on:click={()=>selectPage(urls[2].pageTitle)}>
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Anchor</span>
        </AppRailAnchor>
        
        
        <!-- --- -->
        <svelte:fragment slot="trail">
            <AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
        </svelte:fragment>
    </AppRail>

    </svelte:fragment>
	<slot />
</AppShell>