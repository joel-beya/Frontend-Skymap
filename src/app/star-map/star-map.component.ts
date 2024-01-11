// star-map.component.ts
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { StarService } from '../services/star.service';
import { Star } from '../interfaces/star.model';

@Component({
  selector: 'app-star-map',
  templateUrl: './star-map.component.html',
  styleUrls: ['./star-map.component.scss'],
})
export class StarMapComponent implements OnInit {
  @ViewChild('starMap', { static: true }) starMap!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private stars: Star[] = [];

  constructor(private ngZone: NgZone, private starService: StarService) {}

  ngOnInit(): void {
    this.initThree();  // Initialise la scène Three.js
    this.starService.getClosest().subscribe((data: Star[]) => {
      this.stars = data;
      this.createStars();  // Crée les étoiles dans la scène Three.js
      this.animate();  // Lance l'animation
    });
  }

  private initThree(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initialise la scène Three.js
    this.scene = new THREE.Scene();

    // Initialise la caméra
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Initialise le rendu
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.starMap.nativeElement.appendChild(this.renderer.domElement);

    // Gère le redimensionnement de la fenêtre
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  private createStars(): void {
    for (const star of this.stars) {
      // Ajuste la taille en fonction de la luminosité
      const size = star.lum / 1000000; // Ajustez cela en fonction de votre échelle

      // Crée une sphère pour chaque étoile
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

      // Crée le maillage pour l'étoile
      const starMesh = new THREE.Mesh(geometry, material);

      // Positionne l'étoile en fonction des coordonnées de la base de données
      starMesh.position.set(star.x, star.y, star.z);

      // Ajoute l'étoile à la scène Three.js
      this.scene.add(starMesh);
    }
  }

  private animate(): void {
    // Lance l'animation
    this.ngZone.runOutsideAngular(() => {
      const render = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(render);
      };
      render();
    });
  }

  private onWindowResize(): void {
    // Gère le redimensionnement de la fenêtre
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}

