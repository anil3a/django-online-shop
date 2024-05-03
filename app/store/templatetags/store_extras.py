from django import template

register = template.Library()


@register.filter
def currency(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    try:
        value = f"${value:,.2f}".replace(".00", "")
    except Exception as e:
        # log the exception to exception : log(e)
        pass
    return value


@register.filter
def currency2dp(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    value = f"${value:,.2f}"
    return value

