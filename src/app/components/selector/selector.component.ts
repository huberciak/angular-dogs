import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dog } from '../../model/dog'
import { DogService } from '../../services/dog.service';
import { MyData } from '../../model/data';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  data!: MyData;
  imageData!: MyData;
  dogList: Dog[] = [];
  dogSelected!: string;
  options: string[] = [];
  imageSource: string = "";
  safeImgURL!: SafeUrl;
  dogURL!: string;

  constructor(private dogService: DogService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchDogs();
  }

  private fetchDogs(){
    this.dogService.getDog().subscribe(data=>{
    this.data = data;
    for(const [key, value] of Object.entries(this.data.message)){
      const newDog:Dog = {
        name: key,
        subbreed: value as string[],
      }
      this.dogList.push(newDog);
    }
    console.log('Dogs fetched', this.dogList);

    for(const dog of this.dogList) {
      if(dog.subbreed.length === 0) {
        this.options.push(dog.name);
      } else {
        for(const sub of dog.subbreed) {
          this.options.push(`${dog.name} ${sub}`);
        }
      }
    }

    })
  }

  form = new FormGroup({
    name: new FormControl(this.dogSelected)
  });

  onDogSelect(dog: any){
      const dogImageRequest = this.dogService.getImage(dog.name).subscribe(data => {
        this.imageData = data;
        console.log(typeof this.imageData.message);
        this.imageSource = this.imageData.message as string;
        this.safeImgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageSource);
        this.dogSelected = dog.name;
        const wikiUrl = "https://en.wikipedia.org/wiki/"
        + dog.name.split(" ").join("_");
        this.dogURL = wikiUrl;
        console.log("Wiki url", wikiUrl)
      });
    }

}
