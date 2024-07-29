import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-app';
  productArray: { productName: string; productQuantity: string }[] = [];
  selectedProductName: string = '';
  selectedProductQuantity: string = '';
  isTableVisible: boolean = false; 
  onSubmit(form: NgForm) {
    
    if (form.valid) {
      if(this.productArray.find((data)=>data.productName === this.selectedProductName)){
        alert("Product already added!")
        return;
      }
      const product = {
        productName: this.selectedProductName,
        productQuantity: this.selectedProductQuantity
      };
      this.productArray.push(product);
      form.resetForm();
      this.selectedProductName = '';
      this.selectedProductQuantity = '';
    }
  }
  toggleTableVisibility() {
    if(this.productArray.length !== 0){
      this.isTableVisible = !this.isTableVisible;
    }
   
  }
  speakOrder() {
    if ('speechSynthesis' in window) {
      const orderTextArray = this.productArray.map(p => `Product: ${p.productName}, Quantity: ${p.productQuantity}`);
      let utteranceIndex = 0;

      const speakNext = () => {
        if (utteranceIndex < orderTextArray.length) {
          const utterance = new SpeechSynthesisUtterance(orderTextArray[utteranceIndex]);
          utterance.rate = 1; // Adjust the rate if needed
          utterance.pitch = 1; // Adjust the pitch if needed
          utterance.volume = 1; // Adjust the volume if needed
          utterance.onend = () => {
            utteranceIndex++;
            setTimeout(speakNext, 500); // 500ms delay between utterances
          };
          window.speechSynthesis.speak(utterance);
        }
      };

      speakNext();
    } else {
      console.error('Text-to-speech not supported.');
    }
  }
}