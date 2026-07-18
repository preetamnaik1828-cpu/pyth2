def calc_sum(n):
    if (n==0):
        return
    print(n)
    return calc_sum  (n-1) + n
sum=calc_sum(4)
print(sum)