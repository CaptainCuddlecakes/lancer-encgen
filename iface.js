function generateAndShow(e) {
    e.preventDefault();
    var playerCount = $('#playerCount').val();
    var licenseLevel = $('#licenseLevel').val();

    var results = generateEncounter(playerCount, licenseLevel);

    var $template = $('#npcTemplate').html();
    $('#outputZone').empty();



    for (let npcGroup of results) {
        let [count, name] = npcGroup;


        let $npcDiv = $($template);

        $('#outputZone').append($npcDiv);

        $npcDiv.find('.lreg-npcCount').text(count + 'x');
        $npcDiv.find('.lreg-npcName').text(name);


    }

}

$(() => {
    $('#generateButton').click(generateAndShow);
});