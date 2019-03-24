import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (filterString === "") {
      return value;
    }
    let resultArray = [];
    for (const item of value) {
      let regex = new RegExp(filterString, "i");
      if (item[propName].match(regex)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
