$(function () {
    $("#repoAddPopUp").dialog({autoOpen: false});
    $("#addRepo").click(function () {
        $("#repoAddPopUp").dialog("open");
    })
    $("#addRepoAndLabel")
        .click(
        function () {
            $.ajax({
                type: "post",
                url: "/home/addRepo",
                data: {repoPath: $("#repoPath").val(), repoLabel: $("#repoLabel").val(), branchName:$('#branchName').val(),
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