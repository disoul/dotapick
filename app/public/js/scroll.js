var strScroll, agiScroll, intScroll;
function goScroll() {
    try{
        blocknode = document.getElementById('heroblock').parentNode.parentNode;
        strScroll = new IScroll(blocknode);
    }
    catch (err){
        setTimeout("goScroll()",500);
        console.log('try');
    }
};
