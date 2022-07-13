import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "thFirstWord",
  standalone: true,
  pure: true,
})
export class SharedUtilsFirstWord implements PipeTransform {
  transform(value: string) {
    return value.split('')[0] || '';
  }
}
