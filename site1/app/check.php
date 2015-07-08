<?php
$connection = mysql_connect('localhost', 'root', '');
$dbase = mysql_select_db('site1', $connection);

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

function clean_up_value($value='')
{
  $value = trim($value);
  $value = strip_tags($value);
  $value = htmlentities($value, ENT_QUOTES, "UTF-8");
  return $value;
}

function check_length($value = "", $min, $max) {
  $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
  return !$result;
}

$name = clean_up_value($name);
$email = clean_up_value($email);
$phone = clean_up_value($phone);
$message = clean_up_value($message);

function check($name1, $email1, $phone1, $message1){
  if(!empty($name1) && !empty($email1) && !empty($phone1)){
    $email = filter_var($email1, FILTER_SANITIZE_EMAIL);
    if(!filter_var($email1, FILTER_VALIDATE_EMAIL)){
      return $error_mail = "Ошибка! Введен некорректный адрес: $email";
    }
    if(check_length($name1, 3, 225) && check_length($email1, 5, 100) && check_length($phone1, 12, 20) && check_length($message1, 0, 1000)) {
        return $success = "Ваше сообщение успешно отправлено!";
      }
      else{
         return $error_length = "Слишком длинные поля!";
      }
  }
  else{
    return $error_empty = "Ошибка! Пожалуйста, заполните все обязательные поля.";
  }
}

$response = check($name, $email, $phone, $message);
$ip = $_SERVER['REMOTE_ADDR'];
$date_time = date("Y-m-d H:i:s");

if($response === 'Ваше сообщение успешно отправлено!'){
  $query = mysql_query("INSERT INTO mod_feedback(fio, email, phone, descr, dt, ip) values ('$name', '$email', '$phone','$message', '$date_time', '$ip')");

  $send_to_admin = 'Имя: '. $name .', Почта: '. $email .', Телефон: '. $phone. ', Обращение: '. $message;
  mail('nikolay.dyshkant.work.offers@yandex.ru', 'Сообщение с site1', $send_to_admin);
}

$answer = "<p class='response-message'>\"$response\"</p>";

echo $answer;
mysql_close($connection);

?>