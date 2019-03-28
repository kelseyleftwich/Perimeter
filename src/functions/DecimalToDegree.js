export default function deg_to_dms (deg, longitude) {
   let d = Math.floor (deg);
   let minfloat = (deg-d)*60;
   let m = Math.floor(minfloat);
   let secfloat = (minfloat-m)*60;
   let s = Math.round(secfloat);
   let direction = deg<0?longitude?'W':'S':longitude?'E':'N';
   // After rounding, the seconds might become 60. These two
   // if-tests are not necessary if no rounding is done.
   if (s==60) {
     m++;
     s=0;
   }
   if (m==60) {
     d++;
     m=0;
   }
   return ("" + d + "°" + m + "'" + s + "\"" + direction);
}
