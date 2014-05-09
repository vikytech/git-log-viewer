$(function () {
    $("#repoAddPopUp").dialog({autoOpen: false});
    $("#AddRepo").click(function () {
        $("#repoAddPopUp").dialog("open");
    })
    $("#AddRepoAndLabel")
        .click(
        function () {
            $.ajax({
                type: "post",
                url: "/home/addRepo",
                data: {repoPath: $("#repoPath").val(), repoLabel: $("#repoLabel").val(),
                    success: function () {
                        $("#statusArea").prepend('<span class="flashMessage">Repository added successfully</span>');
                        setTimeout(
                            function () {
                                $(".flashMessage").remove();
                            }, 2000)
                    }
                }
            })
        }
    );
});