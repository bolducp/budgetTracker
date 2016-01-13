"use strict";

$(document).ready(init);

var account = {};
account.balance = 500;

function init(){
  var currentDate = moment().format('YYYY-MM-DD');
  $('#date').attr("max", currentDate);
  clickHandler();
}


function clickHandler(){
  $("#newTransaction").submit(addTransaction);
  $("#transactions").on("click", ".glyphicon-trash", deleteTransaction);
  $("#typeOfTransaction").change(filterTransactions);
}


function addTransaction(event){
  event.preventDefault();

  var transactionType = $('#transactionType').val();
  var description = $('#description').val();
  var amount = parseFloat($('#amount').val());
  var date = $('#date').val();
  var formattedDate = moment(date).format("ll");

  updateBalance(transactionType, amount);

  var $tableRow = $("#template").clone();
  if (transactionType === "deposit"){
    $tableRow.addClass("deposit");
  } else{
    $tableRow.addClass("withdrawals");
  }
  $tableRow.removeAttr("id");
  $tableRow.children(".date").text(formattedDate);
  $tableRow.children(".description").text(description);
  $tableRow.children(".amount").text("$ " + getFormattedAmount(transactionType, amount));
  $tableRow.children(".runningBalance").text("$ " + account["balance"]);
  $("#transactions").prepend($tableRow);
  $("#newTransaction").trigger("reset");
}

function deleteTransaction(){
  $(this).closest("tr").remove();
}


function updateBalance(transactionType, amount){
  if (transactionType === "deposit"){
    Math.round((account.balance += amount) * 100)/100;
  } else{
    Math.round((account.balance -= amount) * 100)/100;;
  }
  $('h3').text("Current Account Balance: $" + account["balance"]);
}


function getFormattedAmount(transactionType, amount){
  if (transactionType === "deposit"){
    return amount;
  } else{
    return amount * -1;
  }
}

function filterTransactions(){
  var transactionType = $(this).val();
  $('tr').children().css("display", "table-cell");
  $('tr').css("display", "table-row");
  if (transactionType === "deposits"){
    $('.withdrawals').hide();
  }else if (transactionType === "withdrawals"){
    $('.deposit').hide();
  } else {
    $('tr').css("display", "table-row");
  }
 $('#template').css("display", "none");
}
