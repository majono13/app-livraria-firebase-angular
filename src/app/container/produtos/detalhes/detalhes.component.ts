import { Component, OnInit, Inject } from '@angular/core';


import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Livro } from 'src/app/shared/models/livros.models';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public livro: Livro) {
  }

  ngOnInit(): void {
  }

}
