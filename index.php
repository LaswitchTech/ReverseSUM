<?php
if(!empty($_POST)){
    $invoice = explode( "\n", trim(trim($_POST['lines'],"\n"),"\r") );
    $recap = explode( "\n", trim(trim($_POST['totals'],"\n"),"\r") );
    if(isset($_POST['Remove'])){
        //We remove the selected results from the lines
        $selection = explode( ",", $_POST['Selection'] );
        foreach($selection as $line){
            unset($invoice[$line]);
        }
        unset($_POST['lines']);
        $_POST['lines'] = '';
        foreach($invoice as $line){
            $_POST['lines'] .= $line."\n";
        }
    }
    if(isset($_POST['Calculate'])){
        function ReverseSUM($value,$array){
            ini_set('max_execution_time', 30);
            if (!function_exists('GenerateIteration')) {
                function GenerateIteration($number){
                    $iteration=array();
                    $count = 0;
                    while($count < $number){
                        array_push($iteration,$count);
                        $count++;
                    }
                    return $iteration;
                }
            }
            if (!function_exists('IncrementIteration')) {
                function IncrementIteration($iteration,$max){
                    $count=count($iteration);
                    while($count > 0){
                        if( $iteration[($count-1)] < $max ){
                            $iteration[($count-1)]++;
                            if($count != count($iteration)){
                                $count2=$count;
                                while($count2 <= count($iteration)){
                                    if($count2 != count($iteration)){
                                        $iteration[$count2]=($iteration[($count2-1)]+1);
                                    }
                                    $count2++;
                                }
                            }
                            break;
                        }
                        $max--;
                        $count--;
                    }
                    return $iteration;
                }
            }
            if (!function_exists('SumIteration')) {
                function SumIteration($iteration,$array){
                    $result=array();
                    foreach($iteration as $key){
                        array_push($result,$array[$key]);
                    }
                    return array_sum($result);
                }
            }
            $count=count($array);
            if((isset($_POST['max'])) and ($_POST['max'] != "")){
                if(($count>$_POST['max'])&&($_POST['max']!=0)){$count = $_POST['max'];}
            }
            $values=array();
            while($count > 0){
                //Init of While Iteration
                $iteration=GenerateIteration($count);
                //We iterate
                while(TRUE){
                    if(SumIteration($iteration,$array) == $value){
                        array_push($values,$iteration);
                    }
                    if($iteration === IncrementIteration($iteration,(count($array)-1))){
                        break;
                    } else {
                        $iteration=IncrementIteration($iteration,(count($array)-1));
                    }
                    //End of While Iteration
                }
                //End of While Iteration
                unset($iteration);
                $count--;
            }
            return $values;
        }
    }
}
?>
<!doctype html>
<html lang="en" class="h-100">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Louis Ouellet, https://github.com/LouisOuellet">
    <title>Reverse SUM</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
    <!-- Custom styles for this template -->
    <link href="sticky-footer-navbar.css" rel="stylesheet">
  </head>
  <body class="d-flex flex-column h-100">
    <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="index.php">Reverse SUM</a>
        <div class="navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="https://github.com/LouisOuellet/ReverseSUM">GitHub</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Begin page content -->
    <main role="main" class="flex-shrink-0">
      <div class="container pt-5">
        <h1 class="mt-5">Reverse SUM</h1>
        <p class="lead">This PHP code calculates the reverse sum of a given total. This is usefull when you are looking for all the invoices lines that would equal a total on recap for example.</p>
      </div>
      <form method="post">
          <div class="container">
            <div class="row pb-2">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="totals">Totals (One per Line)</label>
                        <textarea class="form-control" id="totals" name="totals" rows="6"><?php if(isset($_POST['totals'])){ echo trim(trim($_POST['totals'],"\n"),"\r"); }?></textarea>
                    </div>
                    <?php if(!empty($_POST)){?>
                        <div class="p-3 col-md-12<?php if(array_sum($invoice) == array_sum($recap)) { echo " bg-success"; } ?>">
                            Total : $<?=array_sum($recap)?><br />
                            Lines : <?=count($recap)?>
                        </div>
                    <?php } ?>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="lines">Lines (One per Line)</label>
                        <textarea class="form-control" id="lines" name="lines" rows="6"><?php if(isset($_POST['lines'])){ echo trim(trim($_POST['lines'],"\n"),"\r"); }?></textarea>
                    </div>
                    <?php if(!empty($_POST)){?>
                        <div class="p-3 col-md-12<?php if(array_sum($invoice) == array_sum($recap)) { echo " bg-success"; } ?>">
                            Total : $<?=array_sum($invoice)?><br />
                            Lines : <?=count($invoice)?>
                        </div>
                    <?php } ?>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="max">Maxium amount of values per iteration</label>
                        <input type="number" class="form-control" id="max" name="max" placeholder="Maxium amount of values per iteration" value="<?php if(isset($_POST['max'])) { echo $_POST['max']; } else { echo 3;}?>">
                        <p class="text-muted">
                            The higher the value the longer it will take.<br />
                            Long request might timeout(30 Seconds).<br />
                            Tested with a maximum of 5 for this server.<br />
                            Enter 0 for no limit.
                        </p>
                    </div>
                </div>
                <div class="col-md-12" style="margin-top:5px;">
                    <button type="submit" name="Calculate" class="btn btn-primary btn-block">Calculate</button>
                </div>
            </div>
          </div>
          <?php if((!empty($_POST))&&(isset($_POST['Calculate']))){?>
          <div class="container" style="padding:25px;">
              <div class="row">
                    <?php foreach($recap as $line => $value){ ?>
                      <table class="table table-striped table-bordered table-hover table-sm">
                        <thead class="thead-dark">
                          <tr class="bg-info">
                              <th colspan="3" class="bg-info" style="text-align:left;">Line <?=($line +1)?> - <?=$value?></th>
                          </tr>
                          <tr>
                              <th style="width:20%;">Iteration</th>
                              <th>Values</th>
                              <th style="width:15%;">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php foreach(ReverseSUM($value,$invoice) as $iteration => $values){ $selection = '';?>
                              <tr>
                                  <td><?=($iteration +1)?></td>
                                  <td>
                                      <?php foreach($values as $array){?>
                                          <p>Line <?=($array +1)?> Value : <?= $invoice[$array]?></p>
                                          <?php $selection .= $array.','; ?>
                                      <?php } ?>
                                  </td>
                                  <td>
                                      <form method="post">
                                          <input type="hidden" style="display:none;" name="Selection" value="<?=trim($selection,',')?>">
                                          <textarea style="display:none;" name="lines"><?=$_POST['lines']?></textarea>
                                          <textarea style="display:none;" name="totals"><?=$_POST['totals']?></textarea>
                                          <input type="hidden" style="display:none;" name="max" value="<?=$_POST['max']?>">
                                          <button type="submit" name="Remove" class="btn btn-danger">Remove</button>
                                      </form>
                                  </td>
                              </tr>
                          <?php } ?>
                        </tbody>
                      </table>
                    <?php } ?>
              </div>
          </div>
          <?php } ?>
      </form>
    </main>

    <footer class="footer mt-auto py-3" style="padding:10px;background-color:#ccc;">
      <div class="float-right d-none d-sm-block">
        <b>Version</b> 1.1
      </div>
      <strong>Copyright &copy; 2019-2020 <a href="http://alb.laswitchtech.com">ALB Compagnie International</a>.</strong> All rights reserved.
    </footer>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</html>
