            // Attach JQuery.click() functions to buttons
            $(document).ready(function() {
                var options = {"animation":"none"};
                $("#textMe").click(function(e) {
                    e.preventDefault();
                    $('#textMeModal').reveal(options);
                });
                $("#textMeSubmit").click(function() {
                    $('#textMeSubmit').addClass("disabled loading");
                    $.ajax({
                        url: '/textMe',
                        type: 'post',
                        data: {
                            "name": $('#textMeNumber').val(),
                            "message": $('#textMeMessage').val(),
                        },
                        success: function(data) {
                            $('#textMeSubmit').removeClass("disabled loading");
                            $('#textMeModal').trigger('reveal:close-first');
                            $('#thankYouModal').reveal(options);
                            setTimeout(function() {
                                $('#thankYouModal').trigger('reveal:close');
                            }, 2000);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert('There was an error sending the message.');
                        }
                    });
                });
                $("#getText").click(function(e) {
                    e.preventDefault();
                    $('#getTextModal').reveal(options);
                });
                $("#getTextSubmit").click(function() {
                    $('#getTextSubmit').addClass("disabled loading");
                    $.ajax({
                        url: '/getText',
                        type: 'post',
                        data: {
                            "number": $('#getTextNumber').val(),
                        },
                        success: function(data) {
                            $('#getTextSubmit').removeClass("disabled loading");
                            $('#getTextModal').trigger('reveal:close-first');
                            $('#thankYouModal').reveal(options);
                            setTimeout(function() {
                                $('#thankYouModal').trigger('reveal:close');
                            }, 2000);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert('There was an error sending the message.');
                        }
                    });
                });
                $("#locateMe").click(function(e) {
                    e.preventDefault();
                    $('#locateMe').addClass("disabled loading");
                    $.ajax({
                        url: '/locateMe',
                        type: 'get',
                        success: function(data) {
                            $('#locateMe').removeClass("disabled loading");
                            $('#locateMeModal').reveal(options);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert('There was an error locating me.');
                        }
                    });
                });
                $("#getCall").click(function(e) {
                    e.preventDefault();
                    $('#getCallModal').reveal(options);
                });
                $("#getCallSubmit").click(function() {
                    $('#getCallSubmit').addClass("disabled loading");
                    $.ajax({
                        url: '/getCall',
                        type: 'post',
                        data: {
                            "number": $('#getCallNumber').val()
                        },
                        success: function(data) {
                            $('#getCallSubmit').removeClass("disabled loading");
                            $('#getCallModal').trigger('reveal:close-first');
                            $('#thankYouModal').reveal(options);
                            setTimeout(function() {
                                $('#thankYouModal').trigger('reveal:close');
                            }, 2000);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert('There was an error placing the call.');
                        }
                    });
                });
                $("#donate").click(function(e) {
                    e.preventDefault();
                    window.location = '/donate';
                });
                $("#donateSubmit").click(function() {
                    $('#donateSubmit').addClass("disabled loading");

                });
                $("#speech").click(function(e) {
                    e.preventDefault();
                    $('#speechModal').reveal(options);
                });
                $("#speechSubmit").click(function() {
                    $('#speechSubmit').addClass("disabled loading");

                });
                // clear input on focus
                var clearMePrevious = '';
                $('input').focus(function() {
                    if ($(this).val() == $(this).attr('title')) {
                        clearMePrevious = $(this).val();
                        $(this).val('');
                    }
                });
                // if field is empty afterward, add text again
                $('input').blur(function() {
                    if ($(this).val() == '') {
                        $(this).val(clearMePrevious);
                    }
                });
                $('textarea').focus(function() {
                    if ($(this).val() == $(this).attr('title')) {
                        clearMePrevious = $(this).val();
                        $(this).val('');
                    }
                });
                $('textarea').blur(function() {
                    if ($(this).val() == '') {
                        $(this).val(clearMePrevious);
                    }
                });
            });