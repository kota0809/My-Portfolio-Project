public with sharing class WeatherAppService {
    @AuraEnabled(cacheable=true)
    public static string getWeatherDetails(String city){
        
        
            String url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric'+getKey();

            String response = getResponse(url);
            return response;
    }

   public static String getResponse( String url) {
        HttpRequest req = new HttpRequest();
        req.SetEndpoint(url);
        req.setMethod('GET');

        Http http = new Http();
        HttpResponse res = http.send(req);
        String response = res.getBody();
        return response;
    }
    public static  String getKey() {
        String API_KEY ='d791a5310be3ff439422c913c0848767';
        String key = '&appid='+API_KEY;
        return key;
    }
}