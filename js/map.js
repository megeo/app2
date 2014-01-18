            //Add event listener to run when the device is ready
            document.addEventListener("deviceready", onDeviceReady, false);
            
            //Device is ready, Get geolocation data 
            function onDeviceReady() {
                navigator.geolocation.getCurrentPosition(onSuccess,onError);
			navigator.splashscreen.show();
            }
            
            //If successful, get position data
            function onSuccess(position) {
                var latLng = new google.maps.LatLng(-41.2953619779589,174.783540002043);
                //Select map options
                var mapOptions = {
                    center: latLng,
                    panControl: false,
                    zoomControl: true,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById('map_placer'),mapOptions);
                var marker = new google.maps.Marker({position: latLng,map: map});
            }
            
            //If not successfull, handle errors
            function onError(error) {
                var errString = '';
                // Check to see if we have received an error code
                if(error.code) {
                    // If we have, handle it by case
                    switch(error.code)
                    {
                        case 1: //Permission Denied
                            errString =
                                'Can not fetch the location information ' +
                                'because the device does not have permission.';
                            break;
                        case 2: //Position is unavailable
                            errString =
                                'Can not fetch the location information ' +
                                'because the device location could not ' +
                                'be determined.';
                            break;
                        case 3: //Timeout Error
                            errString =
                                'Can not fetch the location within the ' +
                                'specified time allocation.';
                            break;
                        default: //Unknown
                            errString =
                                'Can not fetch the location of the ' +
                                'device because of an unknown error.';
                            break;
                    }
                }
                //Display errors in div
                var element = document.getElementById('map_placer');
                element.innerHTML = errString;
            }
