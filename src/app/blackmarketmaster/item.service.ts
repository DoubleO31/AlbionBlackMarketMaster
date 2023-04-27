import { Injectable } from "@angular/core";
import { ItemType } from "./item-type";
import { ItemClass } from "./item-class";
import { Http, Response } from "@angular/http";
import { Item } from "./item";
import { ItemDetailed } from "./item-detailed";
import moment from "moment";
import { forkJoin } from "rxjs";
import * as item from "../../../databasecollections - dbname - blackmarketmaster/index";
@Injectable({
  providedIn: "root"
})
export class ItemService {
  // private itemTypeUrl = "http://localhost:8080/api/item_type";
  // private itemClassUrl = "http://localhost:8080/api/item_class";
  // private itemDetailedUrl = "http://localhost:8080/api/item";
  // private marketmaster = "http://localhost:8080/api/marketmaster";
   //private itemTypeUrl = "https://albionblackmarketmaster.com/api/item_type";
   //private itemClassUrl = "https://albionblackmarketmaster.com/api/item_class";
   //private itemDetailedUrl = "https://albionblackmarketmaster.com/api/item";
   //private marketmaster = "https://albionblackmarketmaster.com/api/marketmaster";

  constructor(private http: Http) { }

  getItemType(): Promise<void | ItemType[]> {
    return new Promise<void | ItemType[]>((resolve) => {
      resolve(JSON.parse(JSON.stringify(item.item_type)) as ItemType[]);
    });
  }

  getItemClass(itemClass: String): Promise<void | ItemClass[]> {

    return new Promise<void | ItemClass[]>((resolve) => {
      switch (itemClass) {
        case "armor":
          resolve(JSON.parse(JSON.stringify(item.armor)) as ItemClass[]);
          break;
        case "gathering_gear":
          resolve(JSON.parse(JSON.stringify(item.gathering_gear)) as ItemClass[]);
          break;
        case "melee":
          resolve(JSON.parse(JSON.stringify(item.melee)) as ItemClass[]);
          break;
        case "off_hand":
          resolve(JSON.parse(JSON.stringify(item.off_hand)) as ItemClass[]);
          break;
        case "ranged":
          resolve(JSON.parse(JSON.stringify(item.ranged)) as ItemClass[]);
          break;
        case "accessories":
          resolve(JSON.parse(JSON.stringify(item.accessories)) as ItemClass[]);
          break;
        case "tool":
          resolve(JSON.parse(JSON.stringify(item.tool)) as ItemClass[]);
          break;
        case "magic":
          resolve(JSON.parse(JSON.stringify(item.magic)) as ItemClass[]);
          break;
        default:
          resolve([]);
      }
    });
  }

  getItem(itemm: String): Promise<void | Item[]> {
    return new Promise<void | Item[]>((resolve) => {
      switch (itemm) {
        case 'cloth_armor':
          resolve(JSON.parse(JSON.stringify(item.cloth_armor)) as Item[]);
          break;
        case 'cloth_helmet':
          resolve(JSON.parse(JSON.stringify(item.cloth_helmet)) as Item[]);
          break;
        case 'cloth_shoes':
          resolve(JSON.parse(JSON.stringify(item.cloth_shoes)) as Item[]);
          break;
        case 'leather_armor':
          resolve(JSON.parse(JSON.stringify(item.leather_armor)) as Item[]);
          break;
        case 'leather_shoes':
          resolve(JSON.parse(JSON.stringify(item.leather_shoes)) as Item[]);
          break;
        case 'plate_armor':
          resolve(JSON.parse(JSON.stringify(item.plate_armor)) as Item[]);
          break;
        case 'plate_helmet':
          resolve(JSON.parse(JSON.stringify(item.plate_helmet)) as Item[]);
          break;
        case 'plate_shoes':
          resolve(JSON.parse(JSON.stringify(item.plate_shoes)) as Item[]);
          break;
        case 'leather_helmet':
          resolve(JSON.parse(JSON.stringify(item.leather_helmet)) as Item[]);
          break;
        case 'mace':
          resolve(JSON.parse(JSON.stringify(item.mace)) as Item[]);
          break;
        case 'dagger':
          resolve(JSON.parse(JSON.stringify(item.dagger)) as Item[]);
          break;
        case 'quarterstaff':
          resolve(JSON.parse(JSON.stringify(item.quarterstaff)) as Item[]);
          break;
        case 'spear':
          resolve(JSON.parse(JSON.stringify(item.spear)) as Item[]);
          break;
        case 'sword':
          resolve(JSON.parse(JSON.stringify(item.sword)) as Item[]);
          break;
        case 'hammer':
          resolve(JSON.parse(JSON.stringify(item.hammer)) as Item[]);
          break;
        case 'axe':
          resolve(JSON.parse(JSON.stringify(item.axe)) as Item[]);
          break;
        case 'orb':
          resolve(JSON.parse(JSON.stringify(item.orb)) as Item[]);
          break;
        case 'book':
          resolve(JSON.parse(JSON.stringify(item.book)) as Item[]);
          break;
        case 'shield':
          resolve(JSON.parse(JSON.stringify(item.shield)) as Item[]);
          break;
        case 'horn':
          resolve(JSON.parse(JSON.stringify(item.horn)) as Item[]);
          break;
        case 'totem':
          resolve(JSON.parse(JSON.stringify(item.totem)) as Item[]);
          break;
        case 'torch':
          resolve(JSON.parse(JSON.stringify(item.torch)) as Item[]);
          break;
        case 'bow':
          resolve(JSON.parse(JSON.stringify(item.bow)) as Item[]);
          break;
        case 'crossbow':
          resolve(JSON.parse(JSON.stringify(item.crossbow)) as Item[]);
          break;
        case 'bag':
          resolve(JSON.parse(JSON.stringify(item.bag)) as Item[]);
          break;
        case 'cape':
          resolve(JSON.parse(JSON.stringify(item.cape)) as Item[]);
          break;
        case 'fire_staff':
          resolve(JSON.parse(JSON.stringify(item.fire_staff)) as Item[]);
          break;
        case 'arcane_staff':
          resolve(JSON.parse(JSON.stringify(item.arcane_staff)) as Item[]);
          break;
        case 'cursed_staff':
          resolve(JSON.parse(JSON.stringify(item.cursed_staff)) as Item[]);
          break;
        case 'frost_staff':
          resolve(JSON.parse(JSON.stringify(item.frost_staff)) as Item[]);
          break;
        case 'holy_staff':
          resolve(JSON.parse(JSON.stringify(item.holy_staff)) as Item[]);
          break;
        case 'nature_staff':
          resolve(JSON.parse(JSON.stringify(item.nature_staff)) as Item[]);
          break;
        default:
          resolve([]);
      }
    });
  }

  // getItemDetail(item: String): Promise<void | ItemDetailed[]> {
  //   console.log(item)
  //   return this.http
  //     .get(this.itemDetailedUrl + "/" + item)
  //     .toPromise()
  //     .then(response => response.json() as ItemDetailed[])
  //     .catch(this.handleError);
  // }

  // sleep(milliseconds: number) {
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }

  blackMarketMaster(itemList: Item[], quality: string, enchantment: string): Promise<void | Item[]> {
    var promises = [];
    var self = this;
    var NamesGroup = [];
    var names = "";
    var i = 1,
      limit = 0;
    itemList.forEach(element => {

      if (Number(enchantment) === 0 && element.UniqueName.includes("@")) {
        return;
      }
      if (Number(enchantment) > 0 && Number(enchantment) < 4 && !element.UniqueName.includes("@" + enchantment)) {
        return;
      }
      if (Number(enchantment) === 4) {
        if (element.UniqueName.includes("@3")) {
          element.UniqueName = element.UniqueName.replace("@3", "@4")
        } else { return; }
      }

      limit++;
      names = names + element.UniqueName + ",";

      if (i >= 200 || limit == itemList.length) {
        NamesGroup.push(names.slice(0, -1));
        names = "";
        i = 0;
      }

      i++;
    });

    if (quality === "0") {

      NamesGroup.forEach(function (d) {
        promises.push(
          self.http
            .get(
              "https://www.albion-online-data.com/api/v2/stats/Prices/" +
              d +
              "?locations=Caerleon,BlackMarket"
            )
            .toPromise()
            .then(response => {
              return response.json();
            })
        );
      });


    } else {

      NamesGroup.forEach(function (d) {
        promises.push(
          self.http
            .get(
              "https://www.albion-online-data.com/api/v2/stats/Prices/" +
              d +
              "?locations=Caerleon,BlackMarket&qualities=" +
              quality
            )
            .toPromise()
            .then(response => {
              return response.json();
            })
        );
      });
    }

    var itemz = [];

    return forkJoin(promises)
      .toPromise()
      .then(results => {
        results.forEach((element: any[]) => {
          var resp = JSON.parse(JSON.stringify(element));

          for (var k in resp) {
            var item = new Item();

            if (
              resp[k]["city"] == "Black Market"
            ) {
              item.ItemID = resp[k]["item_id"];
              item.Quality = resp[k]["quality"];
              item.BuyPriceBM = resp[k]["buy_price_max"];
              item.BuyPriceDate = moment(
                resp[k]["buy_price_max_date"] + "Z"
              ).toDate();
              item.SellPriceCM = 0;
              item.SellPriceDate = moment(
                "2020-02-01T00:07:00" + "Z"
              ).toDate();

              itemz.push(item);
            }
          }

          for (var k in resp) {
            if (resp[k]["city"] == "Caerleon" && item.ItemID != "") {
              itemz.forEach(iit => {
                if (
                  iit.ItemID == resp[k]["item_id"] &&
                  iit.Quality == resp[k]["quality"]
                ) {
                  iit.SellPriceCM = resp[k]["sell_price_min"];
                  iit.SellPriceDate = moment(
                    resp[k]["sell_price_min_date"] + "Z"
                  ).toDate();
                }
              });
            }
          }
        });

        return itemz as Item[];
      })
      .catch(this.handleError);
  }

  procesarDatos(
    newContact: Item[],
    minutes: number,
    Mminutes: number,
    tax: number,
    returns: number
  ): Promise<void | Item[]> {

    var result = [];


    tax = tax / 100;


    newContact.forEach(element => {
      if (element["BuyPriceBM"] - (element["BuyPriceBM"] * tax) > element["SellPriceCM"] && element["SellPriceCM"] > 0 && (element["BuyPriceBM"] - (element["BuyPriceBM"] * tax) - element["SellPriceCM"]) > returns) {
        var date1 = moment(element["BuyPriceDate"],
          "YYYY-MM-DD HH:mm:ss").toDate();
        var date2 = moment(element["SellPriceDate"],
          "YYYY-MM-DD HH:mm:ss").toDate();
        var date3 = moment.utc().toDate();
        // console.log(date1)
        // console.log(date3)
        // console.log(Math.abs(moment(date1).diff(date3, 'minutes')))
        if (Math.abs(moment(date1).diff(date2, 'minutes')) < minutes && Math.abs(moment(date1).diff(date3, 'minutes')) < Mminutes) {
          element["EstimatedReturn"] = element["BuyPriceBM"] - (element["BuyPriceBM"] * tax) - element["SellPriceCM"];
          element["EstimatedReturn"] = Math.round(element["EstimatedReturn"]);
          result.push(element);
        }
      }
    });

    result.sort(function (a, b) {
      if ((a.BuyPriceBM - (a.BuyPriceBM * tax) - a.SellPriceCM) < (b.BuyPriceBM - (b.BuyPriceBM * tax) - b.SellPriceCM)) {
        return 1;
      }
      if ((a.BuyPriceBM - (a.BuyPriceBM * tax) - a.SellPriceCM) > (b.BuyPriceBM - (b.BuyPriceBM * tax) - b.SellPriceCM)) {
        return -1;
      }

      return 0;
    });
    return new Promise<void | Item[]>((resolve) => {
      resolve(result);
    });
  }

  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : "Server error";
    console.error(errMsg); // log to console instead
  }
}
