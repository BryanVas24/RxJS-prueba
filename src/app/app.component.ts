import { Component, DestroyRef, inject, OnInit } from '@angular/core';
//Esto es propio de rxjs y crea numeros cada cierto tiempo
import { interval, map } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    //El tiempo en milisegundos y la constante es para que se limpie del dom al construirse el elemento
    const subscription = interval(1000)
      //Esto es un operador
      .pipe(map((val) => val * 2))
      .subscribe({
        next: (value) => console.log(value),
        //Se llama si el observable ya no emite nada
        complete: () => {},
        //Por si ocurre un error
        error: () => console.log('Ops..'),
      });
    //Esto destruye la suscripción
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
