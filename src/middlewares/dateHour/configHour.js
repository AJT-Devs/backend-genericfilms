export default function configHour(hour){
    hour = hour.toISOString();
    hour = hour.split("T");
    hour = hour[1];
    hour = hour.split(".");
    
    return hour[0];
}