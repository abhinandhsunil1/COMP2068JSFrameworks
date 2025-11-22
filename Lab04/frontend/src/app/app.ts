import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  products: any[] = [];
  name = '';
  price = '';
  description = '';
  _id = '';

  constructor() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const res = await fetch('http://localhost:3001/products');
      this.products = await res.json();
    } catch (err) {
      console.error('Error loading products', err);
    }
  }

  async addProduct() {
    const newProduct = { name: this.name, price: this.price, description: this.description };
    await fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    this.clearForm();
    this.loadProducts();
  }

  async updateProduct() {
    const updatedProduct = { _id: this._id, name: this.name, price: this.price, description: this.description };
    await fetch('http://localhost:3001/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });
    this.clearForm();
    this.loadProducts();
  }

  async deleteProduct(id: string) {
    if (!confirm('Are you sure?')) return;
    await fetch('http://localhost:3001/products/' + id, { method: 'DELETE' });
    this.loadProducts();
  }

  selectProduct(product: any) {
    this._id = product._id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
  }

  clearForm() {
    this._id = '';
    this.name = '';
    this.price = '';
    this.description = '';
  }
}