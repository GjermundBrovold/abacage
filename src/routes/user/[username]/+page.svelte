<!-- Vise spesifikk bruker -->
<script lang='ts'>
    import type { playerInterface } from '../../player';

    // don't change name; it won't work ¯\_(ツ)_/¯
    export let data: playerInterface;
</script>

<div>
    {data.name}
</div>
