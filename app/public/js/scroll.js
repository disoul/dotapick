var strScroll, agiScroll, intScroll;
function goScroll() {
    try{
        var blocknode = document.getElementById('heroblock').parentNode.parentNode;
        var blocknode2 = document.getElementById('heroblock2').parentNode.parentNode;
        var blocknode3 = document.getElementById('heroblock3').parentNode.parentNode;
        strScroll = new IScroll(blocknode);
        agiScroll = new IScroll(blocknode2);
        intScroll = new IScroll(blocknode3);
    }
    catch (err){
        setTimeout("goScroll()",500);
        console.log('try');
    }
};
