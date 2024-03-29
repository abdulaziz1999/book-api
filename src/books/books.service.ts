import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { FilterBookDto } from './dto/filter.book.dto';

@Injectable()
export class BooksService {
  private books: any[] = [];

  getAllBooks(): any[] {
    return this.books;
  }

  getBooks(filter: FilterBookDto): any[] {
    const { title, author, category, min_year, max_year} = filter
    const books = this.books.filter(book => {
        if(title && book.title != title){
          return false;
        }else if(author && book.author != author){
          return false;
        }else if(category && book.category != category){
          return false;
        }else if(min_year && book.year < min_year){
          return false;
        }else if(max_year && book.year > max_year){
          return false;
        }
        return true;
    })
    return books;
  }

  getBook(id: string){
    const bookIdx = this.findBookById(id);
    return this.books[bookIdx];
  }

  createBooks(createBookDto: CreateBookDto) {
    const { title, author, category, year} = createBookDto
    this.books.push({ id:uuidv4() ,title, author, category, year });
  }

  updateBook(id: string, updateBookDto: UpdateBookDto ){
    const { title, author, category, year } = updateBookDto
    const bookIdx = this.findBookById(id);
    this.books[bookIdx].title = title;
    this.books[bookIdx].author = author;
    this.books[bookIdx].category = category;
    this.books[bookIdx].year = year;
  }

  findBookById(id: string){
    const bookIdx = this.books.findIndex(book => book.id === id);

    if(bookIdx === -1){
        throw new NotFoundException(`Book ${id} is not found`);
    }

    return bookIdx;
  }

  deleteBook(id: string){
    const bookIdx = this.findBookById(id);
    this.books.splice(bookIdx, 1);
  }
}
