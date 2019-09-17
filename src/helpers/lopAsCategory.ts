enum LopCategory {
  nil = 'Nil',
  low = 'Low',
  medium = 'Medium',
  high = 'High'
}

export default function lopAsCategory(lop?: string): LopCategory {
  if (!lop) {
    return LopCategory.nil;
  }

  let parsedLop = parseInt(lop);

  if (parsedLop == 0) {
    return LopCategory.nil;
  } else if (parsedLop <= 40) {
    return LopCategory.low;
  } else if (parsedLop <= 70) {
    return LopCategory.medium;
  } else if (parsedLop <= 100) {
    return LopCategory.high;
  }

  return LopCategory.nil;
}
