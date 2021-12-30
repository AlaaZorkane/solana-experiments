#[macro_export]
macro_rules! unwrap_or_return_error {
    ( $e:expr , $err:expr ) => {
        match $e {
            Ok(x) => x,
            Err(_) => return Err($err),
        }
    };
}
