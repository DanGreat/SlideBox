import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories = [
    {category: 'HEALTH', imgUrl: '../../assets/health.jpg',
    page: 'health-category'},
    {category: 'SCIENCE', imgUrl: '../../assets/science.jpg',
    page: 'science-category'},
    {category: 'SPORTS', imgUrl: '../../assets/sports.jpg',
    page: 'sports-category'},
    {category: 'LEISURE', imgUrl: '../../assets/leisure.jpg',
    page: 'leisure-category'},
    {category: 'BUSINESS', imgUrl: '../../assets/business.jpg',
    page: 'business-category'},
    {category: 'TECH', imgUrl: '../../assets/tech.jpg',
    page: 'tech-category'}
  ];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  getCategory(page: string) {
    this.route.navigate([page]);
  }

}
