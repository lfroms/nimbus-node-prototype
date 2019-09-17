enum LopCategory {
  nil = 'Nil',
  low = 'Low',
  medium = 'Medium',
  high = 'High'
}

export default function lopAsCategory(lop?: number): LopCategory {
  if (!lop) {
    return LopCategory.nil;
  }

  if (lop <= 100) {
    return LopCategory.high;
  } else if (lop <= 70) {
    return LopCategory.medium;
  } else if (lop <= 40) {
    return LopCategory.low;
  }

  return LopCategory.nil;
}
