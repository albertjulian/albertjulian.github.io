import { getProfileUser } from "../index/token";

export function padLeft(dataInt, pjg) {
  let str = dataInt;
  for (let w = 0; w < pjg - dataInt.toString().length; w++) {
    str = "0" + str;
  }
  return str;
}

export function copyArray(arrOld) {
  let arrNew = []
  for(let i=0;i<arrOld.length;i++){
    let item = arrOld[i]
    let objItem = {}
    for (let key in item) {
      objItem[key] = item[key]
    }
    arrNew.push(objItem)
  }
  return arrNew
}

export function handleFormatDate (dateBefore){
  let dateBeforeNow = dateBefore;

  if(dateBeforeNow && dateBeforeNow.toString().includes('T')) {
    dateBeforeNow = dateBeforeNow.toString().split('T')[0];
  }

  let dateAfter = new Date(dateBeforeNow);

  return dateAfter.getFullYear() > 1700 ? `${dateAfter.getDate()} ${getMonthNow(dateAfter.getMonth().toString())} ${dateAfter.getFullYear()}` : '';
};

export function getMonthNow(bulanNow) {
  let bulan = '';

  if(bulanNow) {
    if(bulanNow.toString() === '0') {
      bulan = 'Januari';
    } else if(bulanNow.toString() === '1') {
      bulan = 'Februari';
    } else if(bulanNow.toString() === '2') {
      bulan = 'Maret';
    } else if(bulanNow.toString() === '3') {
      bulan = 'April';
    } else if(bulanNow.toString() === '4') {
      bulan = 'Mei';
    } else if(bulanNow.toString() === '5') {
      bulan = 'Juni';
    } else if(bulanNow.toString() === '6') {
      bulan = 'Juli';
    } else if(bulanNow.toString() === '7') {
      bulan = 'Agustus';
    } else if(bulanNow.toString() === '8') {
      bulan = 'September';
    } else if(bulanNow.toString() === '9') {
      bulan = 'Oktober';
    } else if(bulanNow.toString() === '10') {
      bulan = 'November';
    } else if(bulanNow.toString() === '11') {
      bulan = 'Desember';
    }
  }



  return bulan
}

export function deleteSeparator(number, separator) {
  while(number.includes(separator)){
    number = number.replace(separator,"")
  }
  return number
}

export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function formatNumber(number,money) {
  number = (number && number.toString().trim()) || ''
  number = deleteSeparator(number,",")
  let floatingNumber = false;
  
  if(number.includes('.')) {
    const numberSplit = number.split('.')
    floatingNumber = numberSplit[1];
    number = numberSplit[0];
    
    floatingNumber = floatingNumber.substr(0,2);
  }
  
  let pjg = number.length
  if(!isNumeric(number)){
    pjg = pjg-1
    number = number.substr(0,pjg)
  }
  let tmp = ""
  if(pjg>3){
    while(pjg>3){
      pjg -= 3
      tmp = number.substr(pjg,3) + "." + tmp
    }
    if(pjg<=3){
      tmp = number.substr(0,pjg) + "." + tmp
    }
    tmp = tmp.substr(0, tmp.length-1)
  }else{
    tmp = number
  }

  if(money && tmp.length !== 0) {
    tmp += ',00';
  } 

  return tmp.toString().length !== 0 ? `${tmp}${floatingNumber ? `,${floatingNumber}` : ''}` : '-'
}

export function checkPermission(stringPermission) {  
  const user = (getProfileUser() && JSON.parse(getProfileUser())) || [];
  
  if(user && user.username === 'admin') {
    return true;
  }

  if(stringPermission === 'keluar') {
    return true;
  }
  
  return false;
}