/**
* @author: Babu Somasundaram (bubalanisaipriyan@gmail.com)

* @name: Simply Paginate
    A small piece of JS code which does simple pagination. 
    It is based on Ryan Zielke's tablePagination (http://neoalchemy.org/tablePagination.html)
    which is licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php
    It is based on Chun Lin's oneSimpleTablePagination (http://code.google.com/p/one-simple-table-paging/source/browse/trunk/jquery.tablePagination.0.5.js?r=2)
    Button designs are based on Google+ Buttons in CSS design from Pixify
    (http://pixify.com/blog/use-google-plus-to-improve-your-ui/).
 
* @type: jQuery

* @usage:- $("id_or_class").simplyPaginate(options);
   For table pagination, call by table id.
   For any repetitive elements, call by the div id which contains the repetitive tag. For example,
   to paginate ul li call by the div id which contains that ul li.
   options: 
        rowsPerPage - Number - used to determine the starting rows per page. Default: 10
		topNav - Boolean - This specifies the desire to have the navigation be a top nav bar. Default: false
		optionsForRows - Array - This is to set the values on the rows per page. Default: [5,10,25,50,100]
		paginateBy - String - Paginate by repetitive elements mentioned. Eg., "ul li". Default: "tbody tr"
		currPageNumber - Number - Current page number to be set when the pagination is done. Default: 1
	example:
	var options = {
	  'rowsPerPage': 10,
	  'paginateBy': "ul li",
	};
	$("#div_that_contains_ul_li").simplyPaginate(options);

* @requires: jQuery v1.2.3 or above

* @LICENCE: 
The MIT License (MIT)
Copyright (c) 2013 Babu Somasundaram

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/


$.prototype.extend(
	{
		'simplyPaginate': function(userConfigurations) {
		    var defaults = {
				rowsPerPage : 10,
				topNav : false,
				optionsForRows : [5,10,25,50,100],
				paginateBy: "tbody tr",
				currPageNumber: 1
			};
			defaults = $.extend(defaults, userConfigurations);
			
			return this.each(function() {
				var paginationDOM = $(this)[0];
				
				var currPageId = '#pagination_currPage';
				
				var rowsPerPageId = '#pagination_rowsPerPage';
				
				var totalPagesId = '#pagination_totalPages';
				
				var tblLocation = (defaults.topNav) ? "prev" : "next";
		
				var totalRows = $.makeArray($($(this).children(defaults.paginateBy), paginationDOM));
		  
				var currPageNumber = defaults.currPageNumber;
				
				var numRows = totalRows.length;
                var totalPages = resetTotalPages();
                if ($.inArray(defaults.rowsPerPage, defaults.optionsForRows) == -1)
                    defaults.optionsForRows.push(defaults.rowsPerPage);  
		  
				function hideOtherPages(pageNum) {
					var intRegex = /^\d+$/;
					if (!intRegex.test(pageNum) || pageNum < 1 || pageNum > totalPages)
						return;
					var startIndex = (pageNum - 1) * defaults.rowsPerPage;
					var endIndex = (startIndex + defaults.rowsPerPage - 1);
					$(totalRows).show();
					for (var i = 0; i < totalRows.length; i++) {
						if (i < startIndex || i > endIndex) {
							$(totalRows[i]).hide();
						}
					}
				}
		  
				function countNumberOfPages(numRows) {
					var preTotalPages = Math.round(numRows / defaults.rowsPerPage);
					var totalPages = (preTotalPages * defaults.rowsPerPage < numRows) ? preTotalPages + 1 : preTotalPages;
					return totalPages;
				}
				
				function resetTotalPages() {
                    var preTotalPages = Math.round(numRows / defaults.rowsPerPage);
                    var totalPages = (preTotalPages * defaults.rowsPerPage < numRows) ? preTotalPages + 1 : preTotalPages;
                    if ($(paginationDOM)[tblLocation]().find(totalPagesId).length > 0)
                      $(paginationDOM)[tblLocation]().find(totalPagesId).html(totalPages);
                    return totalPages;
                }
		  
				function resetCurrentPage(currPageNum) {

					var intRegex = /^\d+$/;
					if (!intRegex.test(currPageNum) || currPageNum < 1 || currPageNum > totalPages)
						return;
					currPageNumber = currPageNum;
					hideOtherPages(currPageNumber);
					$(paginationDOM)[tblLocation]().find(currPageId).val(currPageNumber);
				}
				
				function resetPerPageValues() {
                    var isRowsPerPageMatched = false;
                    var optsPerPage = defaults.optionsForRows;
                    optsPerPage.sort(function (a,b){return a - b;});
                    var perPageDropdown = $(paginationDOM)[tblLocation]().find(rowsPerPageId)[0];
                    perPageDropdown.length = 0;
                    for (var i=0;i<optsPerPage.length;i++) {
                      if (optsPerPage[i] == defaults.rowsPerPage) {
                        perPageDropdown.options[i] = new Option(optsPerPage[i], optsPerPage[i], true, true);
                        isRowsPerPageMatched = true;
                      }
                      else {
                        perPageDropdown.options[i] = new Option(optsPerPage[i], optsPerPage[i]);
                      }
                    }
                    if (!isRowsPerPageMatched) {
                      defaults.optionsForRows == optsPerPage[0];
                    }
                }
		  
				function createPaginationElements() {
					var paginationHTML = "";
                    paginationHTML += "<div id='tablePagination' style='text-align: center; border-top: solid 2px #0033CC; padding-top: 5px; padding-bottom: 5px;'>";
                    paginationHTML += "<a id='tablePagination_firstPage' href='javascript:;' class='button left'>|&lt;</a>";
                    paginationHTML += "<a id='tablePagination_prevPage' href='javascript:;' class='button right'>&lt;&lt;</a>";
                    paginationHTML += "Page";
                    paginationHTML += "<input id='tablePagination_currPage' type='input' value='" + currPageNumber + "' size='1'>";
                    paginationHTML += "of " + totalPages + "&nbsp;&nbsp;&nbsp;";
                    paginationHTML += "<a id='tablePagination_nextPage' href='javascript:;' class='button left'>&gt;&gt;</a>";
                    paginationHTML += "<a id='tablePagination_lastPage' href='javascript:;' class='button right'>&gt;|</a>";
                    paginationHTML += "</div>";
                    return paginationHTML;
				}
		  
				$(this).before("<style type='text/css'>a.button {color: #023042;font: bold 12px Helvetica, Arial, sans-serif;text-decoration: none;padding: 7px 12px;position: relative;display: inline-block;text-shadow: 0 1px 0 #fff;-webkit-transition: border-color .218s;-moz-transition: border .218s;-o-transition: border-color .218s;transition: border-color .218s;background: #99CCFF;background: -webkit-gradient(linear,0% 40%,0% 70%,from(#38C1F9),to(#C6EDFD));background: -moz-linear-gradient(linear,0% 40%,0% 70%,from(#38C1F9),to(#C6EDFD));border: solid 1px #023042;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;margin-right: 10px;}a.button:hover {color: #247FCA;border-color: #247FCA;-moz-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2) -webkit-box-shadow:0 2px 5px rgba(0, 0, 0, 0.2);box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);}a.button:active {color: #000;border-color: #444;}a.left {-webkit-border-top-right-radius: 0;-moz-border-radius-topright: 0;border-top-right-radius: 0;-webkit-border-bottom-right-radius: 0;-moz-border-radius-bottomright: 0;border-bottom-right-radius: 0;margin: 0;}a.right:hover { border-left: solid 1px #999 }a.right {-webkit-border-top-left-radius: 0;-moz-border-radius-topleft: 0;border-top-left-radius: 0;-webkit-border-bottom-left-radius: 0;-moz-border-radius-bottomleft: 0;border-bottom-left-radius: 0;border-left: solid 1px #f3f3f3;border-left: solid 1px rgba(255, 255, 255, 0);}</style>");

				if (defaults.topNav) {
					$(this).before(createPaginationElements());
				} else {
					$(this).after(createPaginationElements());
				}
		        resetPerPageValues();
				hideOtherPages(currPageNumber);
				
				$(paginationDOM)[tblLocation]().find('#pagination_firstPage').click(function (e) {
					resetCurrentPage(1);
			  	});
			  
			  	$(paginationDOM)[tblLocation]().find('#pagination_prevPage').click(function (e) {
					resetCurrentPage(parseInt(currPageNumber) - 1);
			  	});
			  
			  	$(paginationDOM)[tblLocation]().find('#pagination_nextPage').click(function (e) {
					resetCurrentPage(parseInt(currPageNumber) + 1);
			  	});
			  
			  	$(paginationDOM)[tblLocation]().find('#pagination_lastPage').click(function (e) {
					resetCurrentPage(totalPages);
			  	});
		  
				$(paginationDOM)[tblLocation]().find(currPageId).on('change', function (e) {
					resetCurrentPage(this.value);
				});
				
				$(paginationDOM)[tblLocation]().find(rowsPerPageId).bind('change', function (e) {
                    defaults.rowsPerPage = parseInt(this.value, 10);
                    totalPages = resetTotalPages();
                    resetCurrentPage(1)
                });
		  
			})
		}
	})
