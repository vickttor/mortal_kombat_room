export default function fixDateTime(dateTime){

    if(dateTime){
        // Spliting the dateTime by space
        let arrayDateTime = dateTime.split(' ');
        // Getting date
        let date = arrayDateTime[0];
        // Getting Time and spliting it by ':'
        let time = arrayDateTime[1].split(':');

        // Spliting date by slash and selecting the end of it to return the short year
        let dateFixed = date.split('/')[2].split("").slice(2).join("");
        // Replacing the full year to short
        dateFixed = date.replace(date.split('/')[2], dateFixed)

        // Getting time without seconds
        let timeFixed = time.slice(0,2).join(":");

        //  Creating new Data Time format
        let newDataTime =  dateFixed + " | " + timeFixed;

        // Returning dateTime fixed
        return newDataTime
    }

}