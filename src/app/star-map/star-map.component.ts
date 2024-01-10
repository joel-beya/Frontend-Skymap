import { Component, OnInit } from '@angular/core';
import { StarService } from '../services/star.service';
import { Star } from '../interfaces/star.model';

@Component({
  selector: 'app-star-map',
  templateUrl: './star-map.component.html',
  styleUrls: ['./star-map.component.css'],
})
export class StarMapComponent implements OnInit {
  stars: Star[]= [];

  constructor (public starService: StarService){}
  ngOnInit(): void {
    this.starService.getAllStars().subscribe((data) => {
      this.stars = data;
      // Faites quelque chose avec les étoiles récupérées
    });
  }
}
