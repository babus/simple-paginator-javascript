simple-paginator-javascript
===========================

A simple JQuery based plugin for paginating repetitive elements.

### Usage
`$("id_or_class").simplyPaginate(options);`
* For table pagination, call by table id.
* For any repetitive elements, call by the div id which contains the repetitive tag. For example, to paginate `ul li` call by the div id or class which contains that `ul li`.
* options 
  <pre><code>
  rowsPerPage - Number - used to determine the starting rows per page. Default: 10
  topNav - Boolean - This specifies the desire to have the navigation be a top nav bar. Default: false
  optionsForRows - Array - This is to set the values on the rows per page. Default: [5,10,25,50,100]
  paginateBy - String - Paginate by repetitive elements mentioned. Eg., "ul li". Default: "tbody tr"
	currPageNumber - Number - Current page number to be set when the pagination is done. Default: 1
  </code></pre>

### Example
<pre><code>
var options = {
  'rowsPerPage': 10,
  'paginateBy': "ul li",
};
$("#div_that_contains_ul_li").simplyPaginate(options);
</code></pre>
