export default function configDate(date){
        date = date.toISOString();
        date = date.split("T");
        date = date[0];
        date = date.split("-");

        return `${date[2]}/${date[1]}/${date[0]}`;
    }
