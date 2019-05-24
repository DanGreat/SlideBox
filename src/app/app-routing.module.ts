import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'create-account', loadChildren: './create-account/create-account.module#CreateAccountPageModule' },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'health-category', loadChildren: './health-category/health-category.module#HealthCategoryPageModule' },
  { path: 'science-category', loadChildren: './science-category/science-category.module#ScienceCategoryPageModule' },
  { path: 'sports-category', loadChildren: './sports-category/sports-category.module#SportsCategoryPageModule' },
  { path: 'leisure-category', loadChildren: './leisure-category/leisure-category.module#LeisureCategoryPageModule' },
  { path: 'tech-category', loadChildren: './tech-category/tech-category.module#TechCategoryPageModule' },
  { path: 'business-category', loadChildren: './business-category/business-category.module#BusinessCategoryPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
