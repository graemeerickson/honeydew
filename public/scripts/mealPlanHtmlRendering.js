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
                          <th scope="row" id="breakfast-row">Breakfast</th>
                          <td class="meal-plan-slot" id="0"></td>
                          <td class="meal-plan-slot" id="1"></td>
                          <td class="meal-plan-slot" id="2"></td>
                          <td class="meal-plan-slot" id="3"></td>
                          <td class="meal-plan-slot" id="4"></td>
                          <td class="meal-plan-slot" id="5"></td>
                          <td class="meal-plan-slot" id="6"></td>
                        </tr>
                        <tr>
                          <th scope="row" id="lunch-row">Lunch</th>
                          <td class="meal-plan-slot" id="7"></td>
                          <td class="meal-plan-slot" id="8"></td>
                          <td class="meal-plan-slot" id="9"></td>
                          <td class="meal-plan-slot" id="10"></td>
                          <td class="meal-plan-slot" id="11"></td>
                          <td class="meal-plan-slot" id="12"></td>
                          <td class="meal-plan-slot" id="13"></td>
                        </tr>
                        <tr>
                          <th scope="row" id="dinner-row">Dinner</th>
                          <td class="meal-plan-slot" id="14"></td>
                          <td class="meal-plan-slot" id="15"></td>
                          <td class="meal-plan-slot" id="16"></td>
                          <td class="meal-plan-slot" id="17"></td>
                          <td class="meal-plan-slot" id="18"></td>
                          <td class="meal-plan-slot" id="19"></td>
                          <td class="meal-plan-slot" id="20"></td>
                        </tr>
                        <tr>
                          <th scope="row" id="dessert-row">Dessert</th>
                          <td class="meal-plan-slot" id="21"></td>
                          <td class="meal-plan-slot" id="22"></td>
                          <td class="meal-plan-slot" id="23"></td>
                          <td class="meal-plan-slot" id="24"></td>
                          <td class="meal-plan-slot" id="25"></td>
                          <td class="meal-plan-slot" id="26"></td>
                          <td class="meal-plan-slot" id="27"></td>
                        </tr>
                      </tbody>
                    </table>`;
  let htmlMobile = `<table class="table table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row" colspan="2" class="mobile-day text-center">Sunday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="meal-plan-slot" id="0"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="meal-plan-slot" id="7"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="meal-plan-slot" id="14"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="meal-plan-slot" id="21"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobile-day text-center">Monday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="meal-plan-slot" id="1"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="meal-plan-slot" id="8"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="meal-plan-slot" id="15"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="meal-plan-slot" id="22"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobile-day text-center">Tuesday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="meal-plan-slot" id="2"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="meal-plan-slot" id="9"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="meal-plan-slot" id="16"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="meal-plan-slot" id="23"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobile-day text-center">Wednesday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="meal-plan-slot" id="3"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="meal-plan-slot" id="10"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="meal-plan-slot" id="17"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="meal-plan-slot" id="24"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobile-day text-center">Thursday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="meal-plan-slot" id="4"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="meal-plan-slot" id="11"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="meal-plan-slot" id="18"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="meal-plan-slot" id="25"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobile-day text-center">Friday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="meal-plan-slot" id="5"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="meal-plan-slot" id="12"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="meal-plan-slot" id="19"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="meal-plan-slot" id="26"></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobile-day text-center">Saturday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td class="meal-plan-slot" id="6"></td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td class="meal-plan-slot" id="13"></td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td class="meal-plan-slot" id="20"></td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td class="meal-plan-slot" id="27"></td>
                        </tr>
                      </tbody>
                    </table>`;
  if (screenWidth > 414) {
    return htmlDesktop;
  } else {
    return htmlMobile;
  }
}