import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private fb :FormBuilder){}
  title = 'Continuous Integration With TRAVIS CI';
   test ='Wrong usgae of var keyword'
   subjects=['JS','Angular','React','C#','Java','Python']
   selectedSubjectValues=[]
   favSubjectError:boolean=true
   myForm:FormGroup
   result
   ngOnInit(){
     this.myForm= this.fb.group({
      favSubs:this.addSubsControls() 
     })
    
   }
   addSubsControls(){
     const arr=this.subjects.map(e=>{
       return this.fb.control(false)
     })
     return this.fb.array(arr)
   }
   get subjectsArray(){
     return <FormArray>this.myForm.get('favSubs')
   }
   checkSubControlsTouched(){
     let flag =false
     this.subjectsArray.controls.forEach(control=>{
       if(control.touched){
         flag=true
       }
     })
     return flag
   }
   getSelectedSubjectValues(){
     this.selectedSubjectValues=[]
     this.subjectsArray.controls.forEach((control,i)=>{
       if(control.value){
         this.selectedSubjectValues.push(this.subjects[i])
       }
     })
     this.favSubjectError=this.selectedSubjectValues.length>0 ?false:true
     console.log(this.selectedSubjectValues)
   }
   submitHandler(){
     const subs =this.selectedSubjectValues
     if(this.myForm.valid && !this.favSubjectError){
       this.result = {...this.myForm.value,subs}
       console.log(this.result.subs)
     }
   }
}
