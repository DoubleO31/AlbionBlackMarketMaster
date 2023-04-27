import { Component, OnInit } from "@angular/core";
import { ItemClass } from "../item-class";
import { ItemType } from "../item-type";
import { ItemService } from "../item.service";
import { ItemDetailed } from "../item-detailed";
import { Item } from "../item";
import { forkJoin } from "rxjs";
import moment from "moment";
import * as itemDetails from "../../../../databasecollections - dbname - blackmarketmaster/index";
import { newArray } from "@angular/compiler/src/util";

@Component({
  selector: "app-item-select",
  templateUrl: "./item-select.component.html",
  styleUrls: ["./item-select.component.css"],
  providers: [ItemService]
})
export class ItemSelectComponent implements OnInit {
  item_types: ItemType[];
  item_class: ItemClass[];
  item_detailed: ItemDetailed[];
  item: Item[];
  itemm: Item[];
  itemmm: Item[];

  selected_items: Array<{ name: string; show: string }> = []; //SelectedItem[];
  quality: string = "1";
  minutes: number = 999999999;
  Mminutes: number = 7;
  enchantment: string = "0";
  tax: number = 8;
  returns: number = 10000;
  usable: boolean = true;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItemType().then((item_types: ItemType[]) => {
      this.item_types = item_types.map(item_type => {
        this.itemService
          .getItemClass(item_type.Type)
          .then((item_class: ItemClass[]) => {
            if (item_type.Type === 'accessories') {
              item_type.Class = [
                {
                  "id": "",
                  "Name": "Bag",
                  "Type": "bag",
                  "Selected": false
                },
                {
                  "id": "",
                  "Name": "Cape",
                  "Type": "cape",
                  "Selected": false
                }
              ]
            } else {
              item_type.Class = item_class.map(item_class => {
                return item_class;
              });
            }
          });

        return item_type;
      });
    });
  }

  cop(x: ItemSelectComponent) {

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = x["LocalizedNames"] && x["LocalizedNames"].length
      ? x["LocalizedNames"][0]["EN-US"]
      : "";
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }

  typeClick(selected_item_type: ItemType) {
    if (this.selected_items.length >= 30) {
      alert("You can only pick 30 items at the same time.");
      return;
    }

    this.item_types.forEach(item_type => {
      if (item_type.Type == selected_item_type.Type) {
        selected_item_type.Class.forEach(item_class => {
          var selectedItem = { name: item_class.Type, show: item_class.Name };
          this.selected_items.push(selectedItem);
        });
      }
    });
  }

  itemClick(item_class: ItemClass) {
    if (this.selected_items.length >= 30) {
      alert("You can only pick 30 items at the same time.");
      return;
    }

    for (var i = this.selected_items.length - 1; i >= 0; i--) {
      if (this.selected_items[i].name === item_class.Type) {
        alert("You already picked this item.");
        return;
      }
    }
    var selectedItem = { name: item_class.Type, show: item_class.Name };
    this.selected_items.push(selectedItem);
  }

  removeItem(item_class: any) {
    for (var i = this.selected_items.length - 1; i >= 0; i--) {
      if (this.selected_items[i].name === item_class.name) {
        this.selected_items.splice(i, 1);
      }
    }
  }

  onChangeSelect(value: string) {
    this.quality = value;
  }

  onChangeEnchantment(value: string) {
    this.enchantment = value;
  }
  onChangeMinutes(value: number) {
    this.minutes = value;
  }
  onChangeMMinutes(value: number) {
    this.Mminutes = value;
  }

  onChangeTax(value: number) {
    this.tax = value;
  }

  onChangeReturns(value: number) {
    this.returns = value;
  }

  consultarMaster() {
    this.usable = false;
    var self = this;

    var promises = [];
    this.selected_items.forEach(function (d) {
      promises.push(self.itemService.getItem(d.name));
    });

    this.itemmm = [];

    if (promises.length == 0) {
      this.usable = true;
    }

    forkJoin(promises).subscribe(results => {
      results.forEach((element: Item[]) => {
        this.item = element.map(item => {
          return item;
        });

        this.item.forEach(element => {
          this.itemmm.push(element);
        });
      });



      this.itemService
        .blackMarketMaster(this.itemmm, this.quality, this.enchantment)
        .then((item_class: Item[]) => {
          this.itemmm = item_class.map(item_class => {
            return item_class;
          });

          this.itemService
            .procesarDatos(this.itemmm, this.minutes, this.Mminutes, this.tax, this.returns)
            .then((resulllt: Item[]) => {
              this.itemm = resulllt.map(item_class => {
                item_class.Enchantment = item_class.ItemID.split("@")[1];
                item_class.BuyPriceDateString = moment(
                  item_class.BuyPriceDate
                ).format("lll");
                item_class.SellPriceDateString = moment(
                  item_class.SellPriceDate
                ).format("lll");
                return item_class;
              });

              // if (this.itemm.length <= 0)
              //   alert("No deals found.");
            })
            .then(() => {
              this.itemm.forEach(element => {
                const item = JSON.parse(JSON.stringify(itemDetails.items)).find(obj => obj.UniqueName === element.ItemID);
                element.LocalizedNames = item ? [item.LocalizedNames] : null;
              });
            }).then(() => this.usable = true);
        });

    });

  }
}
