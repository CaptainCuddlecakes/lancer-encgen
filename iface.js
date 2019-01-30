function generateAndShow(e) {
    e.preventDefault();
    var playerCount = $('#playerCount').val();
    var licenseLevel = $('#licenseLevel').val();

    var results = generateEncounter(playerCount, licenseLevel);

    var $template = $('#npcTemplate').html();
    $('#outputZone').empty();

    for (let npcGroup of results) {

        let [count, name] = npcGroup;

        console.log(npcGroup);
        let $npcDiv = $('#outputZone').append($template);

        $npcDiv.find('.lreg-npcCount').text(count);
        $npcDiv.find('.lreg-npcName').text(name);


    }

}

$(() => {
    $('#generateButton').click(generateAndShow);
});