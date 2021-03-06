/*
 Akeeba Frontend Framework (FEF)

 @package   fef
 @copyright (c) 2017-2022 Nicholas K. Dionysopoulos / Akeeba Ltd
 @license   GNU General Public License version 3, or later
*/
window.akeeba=window.akeeba||{};window.akeeba.fef=window.akeeba.fef||{};
akeeba.fef.dropdown=function(a){if("undefined"===typeof a||""===a)a="nav.akeeba-dropdown";a=document.querySelectorAll(a);0!==a.length&&akeeba.System.forEach(a,function(b,d){b=d.querySelectorAll("button");if(0!==b.length){var e=b[0];e.addEventListener("click",function(f){akeeba.System.toggleClass(this,"open");f.preventDefault()});var c=d.querySelectorAll("section > a");0!==c.length&&akeeba.System.forEach(c,function(f,g){g.addEventListener("click",function(h){akeeba.System.triggerEvent(e,"click");akeeba.System.forEach(c,
function(l,k){akeeba.System.removeClass(k,"current")});akeeba.System.addClass(this,"current");h.preventDefault()})})}})}; //# sourceMappingURL=Dropdown.map
