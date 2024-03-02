var app = angular.module("myApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
        .when("/index", {
            templateUrl : "index.html"
        })
        .when("/cart", {
            templateUrl : "cart.html"
        })
        .when("/form", {
            templateUrl : "form.html"
        })
        .when("/store", {
            templateUrl : "store.html"
        })
        .when("/signin", {
            templateUrl : "signin.html"
        })
        .when("/register", {
            templateUrl : "register.html"
        })
        .otherwise({
            templateUrl : "product.html"
        })
    })
    //index - product
    .controller("productCtrl", function ($scope, $http) {
        $scope.arrMsi1 = [];
        $scope.arrMsi2 = [];
        $scope.arrAsus1 = [];
        $scope.arrAsus2 = [];
        $scope.arrAcer1 = [];
        $scope.arrAcer2 = [];
        $scope.arrAccessory1 = [];
        $scope.arrAccessory2 = [];
        $scope.arrCarousel = [];
        $scope.arrCategory = [];
        $http.get("json/index.json").then(
            function(res) {
                $scope.arrCarousel = res.data.carousel;
                $scope.arrCategory = res.data.category;
                $scope.arrMsi1 = res.data.msi1;
                $scope.arrMsi2 = res.data.msi2;
                $scope.arrAsus1 = res.data.asus1;
                $scope.arrAsus2 = res.data.asus2;
                $scope.arrAcer1 = res.data.acer1;
                $scope.arrAcer2 = res.data.acer2;
                $scope.arrAccessory1 = res.data.accessory1;
                $scope.arrAccessory2 = res.data.accessory2;
                $scope.page = 1;
                $scope.limit = 3;
                $scope.start = ($scope.page - 1) * $scope.limit;

                $scope.totalPageMsi = Math.ceil($scope.arrMsi1.length / $scope.limit);
                $scope.numberOfPageMsi = Array.from(Array($scope.totalPageMsi).keys());

                $scope.totalPageAsus = Math.ceil($scope.arrAsus1.length / $scope.limit);
                $scope.numberOfPageAsus = Array.from(Array($scope.totalPageAsus).keys());

                $scope.totalPageAcer = Math.ceil($scope.arrAcer1.length / $scope.limit);
                $scope.numberOfPageAcer = Array.from(Array($scope.totalPageAcer).keys());

                $scope.totalPageAccessory = Math.ceil($scope.arrAcer1.length / $scope.limit);
                $scope.numberOfPageAccessory = Array.from(Array($scope.totalAccessoryr).keys());


                $scope.product = $scope.arrMsi1[0];
                $scope.productDetail = $scope.arrMsi2[0];

                //$scope.proDet = $scope.product.image;
            },
            function(res) {
                alert("Can not found data file");
            }
        );

        $scope.pageMsi = 0;
        $scope.pageAsus = 0;
        $scope.pageAcer = 0;
        $scope.pageAccessory = 0;
        $scope.showPageMsi = function(p) {
            $scope.pageMsi = p * $scope.limit;
        }
        $scope.showPageAsus = function(p) {
            $scope.pageAsus = p * $scope.limit;
        }
        $scope.showPageAcer = function(p) {
            $scope.pageAcer = p * $scope.limit;
        }
        $scope.showPageAcessory = function(p) {
            $scope.pageAccessory = p * $scope.limit;
        }

        $scope.chooseProductMsi = function(index) {
            $scope.product = $scope.arrMsi1[index];
            $scope.productDetail = $scope.arrMsi2[index];
        }
        $scope.chooseProductAsus = function(index) {
            $scope.product = $scope.arrAsus1[index];
            $scope.productDetail = $scope.arrAsus2[index];
        }
        $scope.chooseProductAcer = function(index) {
            $scope.product = $scope.arrAcer1[index];
            $scope.productDetail = $scope.arrAcer2[index];
        }
        $scope.chooseProductAccessory = function(index) {
            $scope.product = $scope.arrAccessory1[index];
            $scope.productDetail = $scope.arrAccessory2[index];
        }

        // $scope.chooseProDet = function (p) {
        //     $scope.proDet = p;
        // }

        //thêm sản phẩm vào mảng/giỏ hàng
        $scope.arrCart = [];
        $scope.cartTotal = 0;
        $scope.cartDiscount = 0;
        $scope.addCart = function (p) {
            $scope.arrCart.push(p);
            $scope.cartTotal += (p.price - (p.price * (p.discount / 100)));
            $scope.cartDiscount += (p.price * p.discount / 100);
        }
        //kiểm tra số lượng sản phẩm trong mảng
        $scope.countProduct = function (id) {
            for (var i = 0 ; i < $scope.arrCart.length; ++i) 
                if ($scope.arrCart[i].id === id)
                    return $scope.arrCart[i].quantity;
            return 0;
        }
        
        //cart
        //thanh toán
        $scope.checkPayment = false;
        $scope.makePayment = function () {
            if ($scope.acc[1].balance > $scope.cartTotal) {
                $scope.checkPayment = true;
            } else {
                $scope.checkPayment = false;
            }
        }
        //xóa 1 dòng trong bảng
        $scope.deleteRow = function (index) {
            $scope.cartDiscount -= ($scope.arrCart[index].price * $scope.arrCart[index].discount / 100);
            $scope.cartTotal -= ($scope.arrCart[index].price - ($scope.arrCart[index].price * ($scope.arrCart[index].discount / 100)));
            $scope.arrCart.splice(index, 1);
        }
        

        //register
        $scope.checkPassword = false;
        $scope.checkPasswordStatus = function () {
            if ($scope.password1 == $scope.password2)
                return $scope.checkPassword = true;
            else
                return $scope.checkPassword = false;
        }

        //sign in
        $scope.acc = [{account : "acc1", password : "123", balance : 10000000}, {account : "acc2", password : "123", balance : 50000000}];

        //search
        $scope.arrSearch = [];
        $scope.search = "";
        $scope.checkSearchStatus = false;
        $scope.checkSearch = function (search) {
            for (var i = 0; i < $scope.arrProduct.length; i++)
                if ($scope.arrProduct[i].name.includes(search))
                    $scope.arrSearch.push($scope.arrProduct[i]);
            if ($scope.arrSearch.length != 0)
                return $scope.checkSearchStatus = true;
            else if ($scope.search === "")
                return $scope.checkSearchStatus = false;
            else
                return  $scope.checkSearchStatus =false; 
        }

        //store
        //sort
        $scope.sort = "";
        $scope.sortBy = function (type) {
            $scope.sort = type;
        }
    });