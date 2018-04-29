function getMealPlanHtml() {
  let screenWidth = screen.width;
  let htmlDesktop = `<table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Meal</th>
                          <th scope="col">Sun</th>
                          <th scope="col">Mon</th>
                          <th scope="col">Tue</th>
                          <th scope="col">Wed</th>
                          <th scope="col">Thu</th>
                          <th scope="col">Fri</th>
                          <th scope="col">Sat</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" id="breakfastRow">Breakfast</th>
                          <td class="mealPlanSlot" id="0"></td>
                          <td class="mealPlanSlot" id="1"></td>
                          <td class="mealPlanSlot" id="2"></td>
                          <td class="mealPlanSlot" id="3"></td>
                          <td class="mealPlanSlot" id="4"></td>
                          <td class="mealPlanSlot" id="5"></td>
                          <td class="mealPlanSlot" id="6"></td>
                        </tr>
                        <tr>
                          <th scope="row" id="lunchRow">Lunch</th>
                          <td class="mealPlanSlot" id="7"></td>
                          <td class="mealPlanSlot" id="8"></td>
                          <td class="mealPlanSlot" id="9"></td>
                          <td class="mealPlanSlot" id="10"></td>
                          <td class="mealPlanSlot" id="11"></td>
                          <td class="mealPlanSlot" id="12"></td>
                          <td class="mealPlanSlot" id="13"></td>
                        </tr>
                        <tr>
                          <th scope="row" id="dinnerRow">Dinner</th>
                          <td class="mealPlanSlot" id="14"></td>
                          <td class="mealPlanSlot" id="15"></td>
                          <td class="mealPlanSlot" id="16"></td>
                          <td class="mealPlanSlot" id="17"></td>
                          <td class="mealPlanSlot" id="18"></td>
                          <td class="mealPlanSlot" id="19"></td>
                          <td class="mealPlanSlot" id="20"></td>
                        </tr>
                        <tr>
                          <th scope="row" id="dessertRow">Dessert</th>
                          <td class="mealPlanSlot" id="21"></td>
                          <td class="mealPlanSlot" id="22"></td>
                          <td class="mealPlanSlot" id="23"></td>
                          <td class="mealPlanSlot" id="24"></td>
                          <td class="mealPlanSlot" id="25"></td>
                          <td class="mealPlanSlot" id="26"></td>
                          <td class="mealPlanSlot" id="27"></td>
                        </tr>
                      </tbody>
                    </table>`;
  let htmlMobile = `<table class="table table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Sunday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="mealPlanSlot" id="0"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="mealPlanSlot" id="7"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="mealPlanSlot" id="14"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="mealPlanSlot" id="21"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Monday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="mealPlanSlot" id="1"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="mealPlanSlot" id="8"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="mealPlanSlot" id="15"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="mealPlanSlot" id="22"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Tuesday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="mealPlanSlot" id="2"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="mealPlanSlot" id="9"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="mealPlanSlot" id="16"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="mealPlanSlot" id="23"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Wednesday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="mealPlanSlot" id="3"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="mealPlanSlot" id="10"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="mealPlanSlot" id="17"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="mealPlanSlot" id="24"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Thursday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="mealPlanSlot" id="4"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="mealPlanSlot" id="11"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="mealPlanSlot" id="18"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="mealPlanSlot" id="25"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Friday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="mealPlanSlot" id="5"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="mealPlanSlot" id="12"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="mealPlanSlot" id="19"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="mealPlanSlot" id="26"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Saturday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="mealPlanSlot" id="6"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="mealPlanSlot" id="13"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="mealPlanSlot" id="20"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="mealPlanSlot" id="27"></td>
                        </tr>
                      </tbody>
                    </table>`;
  if (screenWidth > 414) {
    return htmlDesktop;
  } else {
    return htmlMobile;
  }
}