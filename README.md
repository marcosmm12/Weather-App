# Weather App

This is an app I have developed myself to learn how REST APIs work. I wanted to have a basic understanding of them, so I select [Open-Meteo API](https://open-meteo.com/en/docs) and I use it to make requests to the API to get information about the weather in different locations. Additionally, I manage this information to show it in different elements and not as a simple string. It's not the best design, but it's a starting point as before this project I didn't know anything about React. 

## How it works
1. Choose a city from those availables in the select.
2. Select if you want information of different hours, differents days, or both.
3. Select the quantity of hours and/or days that you want to get information of:
   - You can choose between 1 and 24 hours.
   - You can choose between 1 and 7 days.
   - NOTE*: 1 hour/day corresponds to the current hour/day. If you select a quantity higher than 1, you are going to get   information about the current hour/day and the following ones.
4. Select the information that you want to see: Temperatures, Precipitations and/or Winds.
5. See the information:
   - Hourly infomation will appear under the header "Hourly predictions". If it's bigger than the web page size you will see a black scrollbar to slide and see all the information.
   - Daily information will appear under the header "Daily predictions". If it's bigger than the web page size you will see a black scrollbar to slide and see all the information.
