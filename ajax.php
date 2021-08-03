<?php   
    
    if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){
      error_reporting(E_ALL);
      
      $connect = new PDO('mysql:host=localhost;dbname=hh_cards', 'root', '');
    
    /*--------- проверка наличия соединения-------*/
   /* if ($connect == false){
      print("Ошибка: Невозможно подключиться к MySQL");
      }
      else {
          print("Соединение установлено успешно\n");
      }*/
      $connect->exec("set names utf8");

      $name = $_POST['name'];
      $email = $_POST['email'];
      $message = $_POST['message'];

      /*---передача данных---*/
      
     $sql = "INSERT INTO cards (name, email, message) VALUES (:name, :email, :message)";
     $query = $connect->prepare($sql);
    /* if ($connect->prepare($sql) === false) {
      print_r("Ошибка занесения в базу:"  . "\n" );
      var_dump($query->errorInfo());
      exit;      
    } */
     $query->bindParam(':name', $name, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 100);
     $query->bindParam(':email', $email, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 100);
     $query->bindParam(':message', $message, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 100);
     $query->execute();
    /* print_r("Информация занесена в базу данных" .  "\n");*/

     
      /*----прием данных----*/
      $sqle = "SELECT id, name, email, message FROM cards";
      $sth = $connect->prepare($sqle);
      $sth->execute();

     /* print("PDO::FETCH_ASSOC: ");
      print("Возвращаем следующую строку в виде массива\n");*/
      
     
        while ($row = $result = $sth->fetch(PDO::FETCH_ASSOC)) {
              $cards['id'][] = $row['id'];
              $cards['name'][] = $row['name'];
              $cards['email'][] = $row['email'];
              $cards['message'][] = $row['message'];
              
             /* print_r('результат выгрузки:'  . "\n");
              var_dump($result);*/
              }
              $out = array(
                'cards' => $cards);
              header("Content-Type: application/json; charset=UTF-8");
              echo json_encode($out);
        } exit;
?>