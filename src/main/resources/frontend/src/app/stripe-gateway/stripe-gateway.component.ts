import { Component} from '@angular/core';
import { User } from '../entities/User';
import { ItemService } from '../services/item-service/item.service';

@Component({
  selector: 'app-stripe-gateway',
  templateUrl: './stripe-gateway.component.html',
  styleUrls: ['./stripe-gateway.component.css']
})
export class StripeGatewayComponent {
    paymentHandler: any = null;
    token: any;
    constructor(private itemService: ItemService) {
    }

    ngOnInit() {
        this.invokeStripe();
    }

    makePayment(amount: any) {
        const paymentHandler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51Jof6GJs7OZkYFOstRVxICqKaQ1Na5ujc5BlgP3RkrPcwERYAdjSOX1wR9Vbk83ZDlHnNqfuoRu1th9wAuc3ocJe00Ed3WdPXK',
            locale: 'auto',
            token: (stripeToken: any) => {
                console.log("token: " + stripeToken);
                this.processPayment(stripeToken);
                alert('Stripe token generated!');
            }
        });

        paymentHandler.open({
            name: 'Easy Share',
            description: 'Rental Appliances',
            amount: amount * 100
        });
    }

    invokeStripe() {
        if (!window.document.getElementById('stripe-script')) {
            const script = window.document.createElement("script");
            script.id = "stripe-script";
            script.type = "text/javascript";
            script.src = "https://checkout.stripe.com/checkout.js";
            script.onload = () => {
                this.paymentHandler = (<any>window).StripeCheckout.configure({
                    key: 'pk_test_51Jof6GJs7OZkYFOstRVxICqKaQ1Na5ujc5BlgP3RkrPcwERYAdjSOX1wR9Vbk83ZDlHnNqfuoRu1th9wAuc3ocJe00Ed3WdPXK',
                    locale: 'auto',
                    token: function (stripeToken: any) {

                        alert('Payment has been successfull!');
                    }
                });
            }

            window.document.body.appendChild(script);
        }
    }

    processPayment(token: any) {
        const user = JSON.parse(localStorage.getItem('user') || '') as User;
        this.itemService.processPayment(token.id, 10).subscribe(data => {
            console.log(data);
        })
    }
}

