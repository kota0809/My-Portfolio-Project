public with sharing class CurrencyConverterService {
    @AuraEnabled(cacheable=true)
    public static String getExchangeRate(String countryFrom, String countryTo) {

        String API_KEY = 'aa54d7d2a9693176ea6c5f55';
        String API_URL = 'https://v6.exchangerate-api.com/v6/'+ API_KEY +'/pair/' + countryFrom +'/'+ countryTo;

        HttpRequest req = new HttpRequest();
        req.setEndpoint(API_URL);
        req.setMethod('GET');

        Http http = new Http();

        HttpResponse res = http.send(req);
      //  String result = res.getBody();

        return res.getBody();


    }
}